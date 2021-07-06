
import { width, height, ctx, game } from "../app";
import { particles } from "../game";
import { Enemy } from "./enemy";

export class AIBehavior {
    public parent: Enemy;

    public canShoot: boolean;
    public shootCooldown: number;

    constructor(enemyReference: Enemy, params?: any) {
        this.parent = enemyReference;

        this.canShoot = true;
        this.shootCooldown = 300; // 150;

        if (params) {
            //
        }
    }

    public update(): void {
        if (this.canShoot && this.shootCooldown != 0 && particles.updateEnemyParticles) {
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
            */

            particles.spawnParticleMass({
                x: this.parent.x,
                y: this.parent.y,
                sender: 'ENEMY',
                amount: 12,
                offsetCircle: 1 / 12,
            });
        }
    }
}