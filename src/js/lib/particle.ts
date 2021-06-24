
import Box2D from "./box2d"
import { width, height } from "../game";

export default class ParticleManager {
    public particles: Particle[];

    constructor() {
        this.particles = [];
    }

    public update(): void {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }

        this.particles = this.particles.filter(p => p.alive);
    }

    public render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].render(canvas, ctx);
        }
    }

    public add(params: any) {
        this.particles.push(
            new Particle(params)
        )
    }
}

class Particle extends Box2D {

    constructor(params: any) {
        super(params);
    }

    public update(): void {
        super.automateUpdate();
    }

    public render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "green";
        ctx.fillRect(canvas.width * this.x - this.xHitbox * .5, canvas.height * this.y - this.yHitbox * .5, this.xHitbox, this.yHitbox);
    }

    public get alive(): boolean {
        if (this.x < -.1 || this.x > 1.1)
            return false;

        if (this.y < -.1 || this.y > 1.1)

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.collided ? "red" : "green";
        ctx.fillRect(
            width * this.x - this.xHitbox * .5,
            height * this.y - this.yHitbox * .5,
            this.xHitbox,
            this.yHitbox
        );
    }

        return true;
    }
}