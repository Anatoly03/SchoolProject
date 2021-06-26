
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

            // Check collision
            for (let j = i + 1; j < this.particles.length; j++) {
                if (this.particles[i].sender != this.particles[j].sender) // Your particles don't collide with you.
                    if (this.checkCollision(this.particles[i], this.particles[j])) {
                        this.particles[i].collide(this.particles[j]);
                        this.particles[j].collide(this.particles[i]);
                    }
            }
        }

        this.particles = this.particles.filter(p => p.alive);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].render(ctx);
        }
    }

    public add(params: any) {
        this.particles.push(
            new Particle(params)
        )
    }

    private checkCollision(p1: Box2D, p2: Box2D) {
        return ((Math.abs(p1.x - p2.x)) * 2 < (p1.xHitbox + p2.xHitbox)) &&
            ((Math.abs(p1.y - p2.y)) * 2 < (p1.yHitbox + p2.yHitbox))
    }
}

class Particle extends Box2D {

    public alive: boolean;
    public sender: "HERO" | "NEUTRAL" | "ENEMY";

    constructor(params: any) {
        super(params);

        this.alive = true;
        this.sender = params.sender || "NEUTRAL";
    }

    public update(): void {
        super.automateUpdate();

        if (this.x < -.1 || this.x > 1.1)
            this.alive = false;

        if (this.y < -.1 || this.y > 1.1)
            this.alive = false;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "green";
        ctx.fillRect(
            width * this.x - width * this.xHitbox * .5,
            height * this.y - height * this.yHitbox * .5,
            width * this.xHitbox,
            height * this.yHitbox
        );
    }

    public collide(p: Particle): void {
        this.alive = false;
    }
}