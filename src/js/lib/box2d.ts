
import ParticleManager from "./particle"
import { width, height } from "../game";

export default class Box2D {

    public x: number; // percentage of game screen
    public y: number; // percentage of game screen

    public xSpeed: number; // percentage of game screen
    public ySpeed: number; // percentage of game screen

    public w: number; // absolute pixel
    public h: number; // absolute pixel

    public xHitbox: number; // absolute pixel
    public yHitbox: number; // absolute pixel

    constructor(params: any) {
        this.x = params.x || 0;
        this.y = params.y || 0;

        this.xSpeed = params.xSpeed || 0;
        this.ySpeed = params.ySpeed || 0;

        this.w = params.width || 32;
        this.h = params.height || 32;

        this.xHitbox = params.xHitbox || 16;
        this.yHitbox = params.yHitbox || 16;
    }

    /*public update(
        //keys: any,
        //particles: ParticleManager
    ): void {
        this.automateUpdate();
    }*/

    public automateUpdate(): void {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "white";
        ctx.fillRect(
            width * this.x - this.w * .5,
            height * this.y - this.h * .5,
            this.w,
            this.h
        );
    }

    public isOutOfBorder(): void {

    }
}