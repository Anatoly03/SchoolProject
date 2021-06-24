
import ParticleManager from "./particle"
import Box2D from "./box2d"
import { width, height } from "../game";

export default class Hero extends Box2D {

    public x: number;
    public y: number;

    public xSpeed: number;
    public ySpeed: number;

    public width: number;
    public height: number;

    public canShoot: boolean;
    public shootCooldown: number;

    constructor() {
        super({
            x: .5,
            y: .9,
            xSpeed: .005,
            ySpeed: .005,
            width: 96,
            height: 64
        });

        this.canShoot = true;
        this.shootCooldown = 250;
    }

    public update(keys: any, particles: ParticleManager): void {
        // console.log(keys);

        if (keys["arrowright"] || keys["d"]) {
            this.x += this.xSpeed;
            this.x = Math.min(.9, this.x);
        }

        if (keys["arrowleft"] || keys["a"]) {
            this.x -= this.xSpeed;
            this.x = Math.max(.1, this.x);
        }

        /*if (keys["arrowup"] || keys["w"]) {
            this.y -= this.ySpeed;
            this.y = Math.max(.1, this.y);
        }

        if (keys["arrowdown"] || keys["s"]) {
            this.y += this.ySpeed;
            this.y = Math.min(.9, this.y);
        }*/

        if ((keys[" "] || keys["x"]) && this.canShoot) {
            this.canShoot = false;
            setTimeout(() => this.canShoot = true, this.shootCooldown);
            this.shoot(particles);
        }
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "white";
        ctx.fillRect(
            width * this.x - this.w * .5,
            height * this.y - this.h * .5,
            this.w,
            this.h
        );

        ctx.fillStyle = "grey";
        ctx.textAlign = "center";
		ctx.font = "15px Arial";
		ctx.fillText("HERO", width * this.x, height * this.y);
    }

    // Hero Methods

    public shoot(particles: ParticleManager): void {
        particles.add({
            x: this.x,
            y: this.y,
            ySpeed: -.01,
        })
    }
}