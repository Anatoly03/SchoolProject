
import { width, height, ctx, game } from "../app";
import { particles } from "../game";
import { Enemy } from "./enemy";

export class AIBehavior {
    public canShoot: boolean;
    public shootCooldown: number;

    public data: any;
    public loop: any //(arg0: Enemy, arg1: AIBehavior) => void | ((arg0: Enemy, arg1: AIBehavior) => void)[]
        = (arg0: Enemy, arg1: AIBehavior) => { };
    public loopLevel = 0;
    public loopIncrementCondition = () => false;

    constructor(params?: any) {
        this.canShoot = true;
        this.shootCooldown = 300; // 150;

        if (params) {
            this.data = params.data
            /*{
                canShoot: true,
                shootCooldown: 300,
                timestamp: Date.now(),
            }*/

            this.loop = params.loop;
            /*(parent: Enemy, ai: AIBehavior) => {
                if (ai.data.canShoot && particles.updateEnemyParticles) {
                    ai.data.canShoot = false;
                    setTimeout(() => ai.data.canShoot = true, ai.data.shootCooldown);

                    particles.spawnParticleMass({
                        x: parent.x,
                        y: parent.y,
                        sender: 'ENEMY',
                        amount: 6,
                        offsetCircle: (Date.now() - ai.data.timestamp) / 24000,
                    });
                }
            }*/
        } else {
            this.data = {}
            this.loop = (parent: Enemy, ai: AIBehavior) => { }
        }
    }

    public update(parent: Enemy): void {
        if (typeof this.loop == "function") {
            this.loop(parent, this);
        } else if (typeof this.loop == "object") {
            let that = this;

            function next(condition: () => boolean) {
                this.loopIncrementCondition = condition;
            }

            this.loop[this.loopLevel](parent, this, next);

            if (this.loopIncrementCondition()) {
                this.loopIncrementCondition = () => false;
                this.loopLevel++;
                if (this.loopLevel >= this.loop.length) this.loopLevel = 0;
            }
        }

        /*if (this.canShoot && this.shootCooldown != 0 && particles.updateEnemyParticles) {
            this.canShoot = false;
            setTimeout(() => this.canShoot = true, this.shootCooldown);

            /*
            particles.emit({
                x: this.x,
                y: this.y,
                ySpeed: .01,
                xSpeed: - (this.x - .5) * .02,
                width: .01,
                height: .01,
                sender: "ENEMY",
            })
            * /

            particles.spawnParticleMass({
                x: parent.x,
                y: parent.y,
                sender: 'ENEMY',
                amount: 12,
                offsetCircle: 1 / 12,
            });
        }*/
    }
}