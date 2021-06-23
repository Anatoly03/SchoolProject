
import ParticleManager from "./particle"

export default class Box2D {

    public x: number;
    public y: number;

    public xSpeed: number;
    public ySpeed: number;

    public width: number;
    public height: number;

    public xHitbox: number;
    public yHitbox: number;

    constructor(params: any) {
        this.x = params.x || 0;
        this.y = params.y || 0;

        this.xSpeed = params.xSpeed || 0;
        this.ySpeed = params.ySpeed || 0;

        this.width = params.width || 32;
        this.height = params.height || 32;

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

    public render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "white";
        ctx.fillRect(canvas.width * this.x - this.width * .5, canvas.height * this.y - this.height * .5, this.width, this.height);
    }

    public isOutOfBorder (): void {

    }
}