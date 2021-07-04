
import { width, height, ctx, keys, game } from "../app";
import { particles } from "../game"
import Box2D from "./box2d"

export default class Hero extends Box2D {

    private canShoot: boolean;
    public shootCooldown: number;

    public hp: number;

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
            height: .1,
            xHitbox: .01,
            yHitbox: .01,
        });

        this.canShoot = true;
        this.shootCooldown = 50;

        this.hp = 3;

        this.energy = 1000;
        this.maxEnergy = 1000;
    }

    public update(): void {
        // console.log(keys);

        this.x += this.xMovingDirection * this.xSpeed;
        this.y += this.yMovingDirection * this.ySpeed;

        // Border collision logic
        this.x = Math.min(.99, this.x);
        this.x = Math.max(.01, this.x);
        this.y = Math.max(.01, this.y);
        this.y = Math.min(.99, this.y);

        if ((keys[" "]) && this.canShoot) {
            this.canShoot = false;
            setTimeout(() => this.canShoot = true, this.shootCooldown);
            this.shoot();
        }

        if (this.energy < this.maxEnergy) {
            this.energy += .2;
        }
    }

    public render(): void {
        ctx.strokeStyle = "white";
        ctx.strokeRect(
            width * this.x - width * this.w * .5,
            height * this.y - height * this.h * .5,
            width * this.w,
            height * this.h
        );

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(
            width * this.x - width * this.xHitbox * .5,
            height * this.y - height * this.yHitbox * .5,
            width * this.xHitbox,
            height * this.yHitbox
        );
    }

    // Hero Methods

    public shoot(): void {
        for (let i = -2; i < 3; i++) {
            particles.emit({
                x: this.x + i * .01,
                y: this.y + Math.abs(i) * .005,
                ySpeed: -.02,
                xSpeed: this.xMovingDirection * .015,
                width: .02,
                height: .05,
                xHitbox: .01,
                yHitbox: .05,
                sender: "HERO",
            });
        }
    }

    public collide(obj: Box2D) {
        if (game.isTakingDamage) {
            this.hp -= 1;
            game.takeDamage();
        }
    }

    private get xMovingDirection() {
        let dir = 0;

        if (keys["arrowright"] || keys["d"]) dir++;
        if (keys["arrowleft"] || keys["a"]) dir--;

        return dir;
    }

    private get yMovingDirection() {
        let dir = 0;

        if (keys["arrowup"] || keys["w"]) dir--;
        if (keys["arrowdown"] || keys["s"]) dir++;

        return dir;
    }
}