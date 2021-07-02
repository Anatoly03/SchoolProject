
import Box2D from "./box2d"
import { width, height } from "../game";

export default class ParticleManager {
    public particles: Particle[];

    constructor() {
        this.particles = [];
        this.spawnParticleMass({
            x: .5,
            y: .5,
        });
    }

    public update(): void {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();

            // Check collision
            for (let j = i + 1; j < this.particles.length; j++) {
                if (this.particles[i].type != this.particles[j].type) // Your particles don't collide with you.
                    if (this.checkParticleCollision(this.particles[i], this.particles[j])) {
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

    public spawnParticleMass(params: any) {
        for (let i = 0; i < 50; i++) {
            this.add({
                x: (params.x || .5) + Math.sin(i) * .1,
                y: (params.y || .5) + Math.cos(i) * .1,
                width: 0.01,
                type: params.type ||'ENEMY',
                xSpeed: Math.sin(i) * .005,
                ySpeed: Math.cos(i) * .005,
            });
        }
    }

    private checkParticleCollision(p1: Box2D, p2: Box2D) {
        return ((Math.abs(p1.x - p2.x)) * 2 < (p1.xHitbox + p2.xHitbox)) &&
            ((Math.abs(p1.y - p2.y)) * 2 < (p1.yHitbox + p2.yHitbox))
    }

    public checkCollision(obj: Box2D) {
        for (let i = 0; i < this.particles.length; i++) {
            let particle: Particle = this.particles[i];

            if (particle.type != obj.type)
                if (((Math.abs(particle.x - obj.x)) * 2 < (particle.xHitbox + obj.xHitbox)) &&
                    ((Math.abs(particle.y - obj.y)) * 2 < (particle.yHitbox + obj.yHitbox))) {
                    particle.collide(obj);
                    obj.collide(particle);
                }
        }
    }
}

class Particle extends Box2D {

    public alive: boolean;

    constructor(params: any) {
        params.type = params.sender;
        super(params);

        this.alive = true;
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

    public collide(obj: Box2D): void {
        this.alive = false;
    }
}