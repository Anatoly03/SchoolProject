
import { width, height, ctx, keys } from "../app";
import { particles } from "../game"
import Box2D from "./box2d"

export default class Hero extends Box2D {

    private canShoot: boolean;
    public shootCooldown: number;

    public hp: number;
    public maxHp: number;
    public energy: number;
    public maxEnergy: number;

    constructor() {
        super({
            type: "HERO",
            x: .5,
            y: .9,
            xSpeed: .005,
            ySpeed: .005,
            width: .1,
            height: .1
        });

        this.canShoot = true;
        this.shootCooldown = 50;

        this.hp = 500;
        this.maxHp = 500;

        this.energy = 100;
        this.maxEnergy = 100;
    }

    public update(): void {
        // console.log(keys);

        if (keys["arrowright"] || keys["d"]) {
            this.x += this.xSpeed;
            this.x = Math.min(.9, this.x);
        }

        if (keys["arrowleft"] || keys["a"]) {
            this.x -= this.xSpeed;
            this.x = Math.max(.1, this.x);
        }

        if (keys["arrowup"] || keys["w"]) {
            this.y -= this.ySpeed;
            this.y = Math.max(.1, this.y);
        }

        if (keys["arrowdown"] || keys["s"]) {
            this.y += this.ySpeed;
            this.y = Math.min(.9, this.y);
        }

        if ((keys[" "] || keys["x"]) && this.canShoot && this.energy > 5) {
            this.canShoot = false;
            this.energy -= 5;
            setTimeout(() => this.canShoot = true, this.shootCooldown);
            this.shoot();
        }

        if (this.energy < this.maxEnergy) {
            this.energy += .2;
        }
    }

    public render(): void {
        ctx.fillStyle = "white";
        ctx.fillRect(
            width * this.x - width * this.w * .5,
            height * this.y - height * this.h * .5,
            width * this.w,
            height * this.h
        );

        /*
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(
            width * this.x - width * this.xHitbox * .5,
            height * this.y - height * this.yHitbox * .5,
            width * this.xHitbox,
            height * this.yHitbox
        );
        */

        ctx.fillStyle = "grey";
        ctx.textAlign = "center";
        ctx.font = "15px Arial";
        ctx.fillText("HERO", width * this.x, height * this.y);
    }

    // Hero Methods

    public shoot(): void {
        for (let i = 0; i < 4; i++) {
            particles.emit({
                x: this.x + (i-1.5) * .01,
                y: this.y,
                ySpeed: -.02,
                width: .02,
                height: .05,
                xHitbox: .01,
                yHitbox: .05,
                sender: "HERO",
            });
        }
    }

    public collide(obj: Box2D) {
        this.hp -= 50;
    }
}