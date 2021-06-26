
import ParticleManager from "./particle"
import Box2D from "./box2d"
import { width, height } from "../game";

export default class EnemyManager {
    public enemies: Enemy[];

    constructor() {
        this.enemies = [];

        this.add({
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
        this.enemies[0].shootCooldown = 200;
    }

    public update(particles: ParticleManager): void {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(particles);
        }

        this.enemies = this.enemies.filter(p => p.alive);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].render(ctx);
        }
    }

    public add(params: any) {
        this.enemies.push(
            new Enemy(params)
        )
    }
}

class Enemy extends Box2D {

    public hp: number;

    public canShoot: boolean;
    public shootCooldown: number;

    // Change this to AI
    public originalX: number;
    //public originalY: number;
    //public timeStart: any;

    constructor(params: any) {
        params.type = "ENEMY";
        super(params);

        this.hp = params.hp || 200;
        this.canShoot = true;
        this.shootCooldown = 150;

        this.originalX = params.x;
        //this.originalY = params.y;
        //this.timeStart = Date.now();
    }

    public update(particles: ParticleManager): void {
        this.x = this.originalX + Math.sin(Date.now() * .005) * .08 + Math.cos(Date.now() * .005 * Math.PI) * .03;

        if (this.canShoot && this.shootCooldown != 0) {
            this.canShoot = false;
            setTimeout(() => this.canShoot = true, this.shootCooldown);
            this.shoot(particles);
        }
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "red";
        ctx.fillRect(
            width * this.x - width * this.w * .5,
            height * this.y - height * this.h * .5,
            width * this.w,
            height * this.h
        );
    }

    // Enemy Methods

    public shoot(particles: ParticleManager): void {
        particles.add({
            x: this.x,
            y: this.y,
            ySpeed: .01,
            width: .01,
            height: .01,
            sender: "ENEMY",
        })
    }

    public collide(obj: Box2D) {
        this.hp -= 40;
    }

    public get alive(): boolean {
        return this.hp > 0;
    }
}