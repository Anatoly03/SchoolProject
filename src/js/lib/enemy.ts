
import { width, height, ctx, game } from "../app";
import { particles } from "../game";

import ParticleManager from "./particle";
import Box2D from "./box2d";

export default class EnemyManager {
    public enemies: Enemy[];

    constructor() {
        this.enemies = [];

        /*this.add({
            x: .2,
            y: .1,
            hp: 100,
            width: .05,
            height: .025,
        });

        this.add({
            x: .8,
            y: .1,
            hp: 100,
            width: .05,
            height: .025,
        });

        this.enemies[1].shootCooldown = 500;
        this.enemies[0].shootCooldown = 200;*/
    }

    public update(): void {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
        }

        this.enemies = this.enemies.filter(p => p.alive);
    }

    public render(): void {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].render();
        }
    }

    public add(params: any): Enemy {
        let e = new Enemy(params);
        this.enemies.push(e);
        return e;
    }

    public get length() {
        return this.enemies.length;
    }
}

export class Enemy extends Box2D {

    public hp: number;
    public maxHp: number;

    public canShoot: boolean;
    public shootCooldown: number;
    public updateEnemy;

    // Change this to AI
    public originalX: number;
    //public originalY: number;
    //public timeStart: any;

    constructor(params: any) {
        params.type = "ENEMY";
        super(params);

        this.hp = params.hp || 5;
        this.maxHp = params.maxHp || this.hp;
        this.canShoot = true;
        this.shootCooldown = 150;
        this.updateEnemy = params.update == undefined ? true : params.update;

        this.originalX = params.x;
        //this.originalY = params.y;
        //this.timeStart = Date.now();
    }

    public update(): void {
        if (this.updateEnemy) {
            //this.x = this.originalX + Math.sin(Date.now() * .005) * .08 + Math.cos(Date.now() * .005 * Math.PI) * .03;

            if (this.canShoot && this.shootCooldown != 0 && particles.updateEnemyParticles) {
                this.canShoot = false;
                setTimeout(() => this.canShoot = true, this.shootCooldown);
                this.shoot();

                /*particles.spawnParticleMass({
                    x: this.x,
                    y: this.y,
                    sender: 'ENEMY',
                });*/
            }
        }
    }

    public render(): void {
        ctx.fillStyle = "red";
        ctx.fillRect(
            width * this.x - width * this.w * .5,
            height * this.y - height * this.h * .5,
            width * this.w,
            height * this.h
        );
    }

    // Enemy Methods

    public shoot(): void {
        particles.emit({
            x: this.x,
            y: this.y,
            ySpeed: .01,
            xSpeed: - Math.sign(this.x - .5) * .01,
            width: .01,
            height: .01,
            sender: "ENEMY",
        })
    }

    public collide(obj: Box2D) {
        //console.log(obj.type);
        this.hp -= 1;
    }

    public get alive(): boolean {
        return this.hp > 0;
    }
}