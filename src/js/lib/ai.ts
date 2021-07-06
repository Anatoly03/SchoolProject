
import { width, height, ctx, game } from "../app";
import { particles } from "../game";
import { Enemy } from "./enemy";

export class AIBehavior {
    public canShoot: boolean;
    public shootCooldown: number;

    public data: any;
    public loop = (arg0: Enemy, arg1: AIBehavior) => {};

    constructor(params?: any) {
        this.canShoot = true;
        this.shootCooldown = 300; // 150;

        if (params) {
            this.data = {
                canShoot: true,
                shootCooldown: 300,
            }

            this.loop = (parent, ai) => {
                if (ai.data.canShoot && particles.updateEnemyParticles) {
                    ai.data.canShoot = false;
                    setTimeout(() => ai.data.canShoot = true, ai.data.shootCooldown);

                    particles.spawnParticleMass({
                        x: parent.x,
                        y: parent.y,
                        sender: 'ENEMY',
                        amount: 12,
                        offsetCircle: 1 / 12,
                    });
                }
            }
        } else {
            this.data = {}
            this.loop = (parent, ai) => {}
        }
    }

    public update(parent: Enemy): void {
        this.loop(parent, this);

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