
import { width, height, ctx } from "../app";
import { hero, enemies } from "../game"

import Box2D from "./box2d"
import { Content } from "./image"

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
                if (this.particles[i].type != this.particles[j].type) // Your particles don't collide with you.
                    if (this.checkParticleCollision(this.particles[i], this.particles[j])) {
                        this.particles[i].collide(this.particles[j]);
                        this.particles[j].collide(this.particles[i]);
                    }
            }
        }

        this.checkCollision(hero);
        for (let i = 0; i < enemies.length; i++) {
            this.checkCollision(enemies.enemies[i]);
        }

        this.particles = this.particles.filter(p => p.alive);
    }

    public render(): void {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].render();
        }
    }

    public emit(params: any) {
        this.particles.push(
            new Particle(params)
        )
    }

    public spawnParticleMass(params: any) {
        for (let i = 0; i < 45; i++) {
            this.emit({
                x: (params.x || .5) + Math.sin(i) * .1,
                y: (params.y || .5) + Math.cos(i) * .1,
                width: 0.01,
                sender: params.sender ||'ENEMY',
                xSpeed: Math.sin(i) * .005,
                ySpeed: Math.cos(i) * .005,
            });
        }
    }

    private checkParticleCollision(p1: Box2D, p2: Box2D) {
        if (p1.type != p2.type) return false; // Temporary Line: Enemies don't collide with you.

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

    public get length() {
        return this.particles.length;
    }
}

class Particle extends Box2D {

    public alive: boolean;
    public content: Content;

    constructor(params: any) {
        params.type = params.sender;
        super(params);

        this.content = params.type == 'HERO' ? new Content('bullet-hero') : null;

        this.alive = true;
    }

    public update(): void {
        super.automateUpdate();
        this.content?.update();

        if (this.x < -.1 || this.x > 1.1)
            this.alive = false;

        if (this.y < -.1 || this.y > 1.1)
            this.alive = false;
    }

    public render(): void {
        if (!this.content) {
            ctx.strokeStyle = "green";
            ctx.strokeRect(
                width * this.x - width * this.xHitbox * .5,
                height * this.y - height * this.yHitbox * .5,
                width * this.xHitbox,
                height * this.yHitbox
            );
        }
        this.content?.render(this.x - this.w * .5, this.y - this.h * .5, this.w);
    }

    public collide(obj: Box2D): void {
        this.alive = false;
    }
}