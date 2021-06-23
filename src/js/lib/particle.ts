

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

class Particle {

    public alive: boolean;

    public x: number;
    public y: number;

    public xVel: number;
    public yVel: number;

    public xHitbox: number;
    public yHitbox: number;

    constructor(params: any) {
        this.alive = true;

        this.x = params.x;
        this.y = params.y;

        this.xVel = params.xVel || 0;
        this.yVel = params.yVel || 0;

        this.xHitbox = params.xHitbox || 16;
        this.yHitbox = params.yHitbox || 16;
    }

    public update(): void {
        this.x += this.xVel;
        this.y += this.yVel;
    }

    public render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "green";
        ctx.fillRect(canvas.width * this.x - this.xHitbox * .5, canvas.height * this.y - this.yHitbox * .5, this.xHitbox, this.yHitbox);
    }
}