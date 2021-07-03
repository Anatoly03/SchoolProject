
import { width, height, ctx, tween } from "../app";
import { hero, enemies } from "../game"

import Box2D from "./box2d"
import { Content } from "./image"

export default class ParticleManager {
    public enemyParticles: Particle[];
    public heroParticles: Particle[];

    public updateEnemyParticles = true;

    constructor() {
        this.enemyParticles = [];
        this.heroParticles = [];
    }

    public update(): void {
        // Bullets the hero shoots
        for (let i = 0; i < this.heroParticles.length; i++) {
            this.heroParticles[i].update();
        }

        // Bullets the enemy shoots
        if (this.updateEnemyParticles) {
            for (let i = 0; i < this.enemyParticles.length; i++) {
                this.enemyParticles[i].update();

                for (let j = 0; j < this.heroParticles.length; j++) {
                    this.checkParticleCollision(this.enemyParticles[i], this.heroParticles[j]);
                }
            }
        }

        this.checkCollision(hero);
        for (let i = 0; i < enemies.length; i++) {
            this.checkCollision(enemies.enemies[i]);
        }

        this.heroParticles = this.heroParticles.filter(p => p.alive);
        this.enemyParticles = this.enemyParticles.filter(p => p.alive);
    }

    public render(): void {
        for (let i = 0; i < this.heroParticles.length; i++) {
            this.heroParticles[i].render();
        }

        for (let i = 0; i < this.enemyParticles.length; i++) {
            this.enemyParticles[i].render();
        }
    }

    public emit(params: any) {
        if (params.sender == 'HERO') {
            this.heroParticles.push(
                new Particle(params)
            )
        } else if (params.sender == 'ENEMY') {
            this.enemyParticles.push(
                new Particle(params)
            )
        }
    }

    public spawnParticleMass(params: any) {
        for (let i = 0; i < 45; i++) {
            this.emit({
                x: (params.x || .5) + Math.sin(i) * .1,
                y: (params.y || .5) + Math.cos(i) * .1,
                width: 0.01,
                sender: params.sender || 'ENEMY',
                xSpeed: Math.sin(i) * .005,
                ySpeed: Math.cos(i) * .005,
            });
        }
    }

    private checkParticleCollision(p1: Box2D, p2: Box2D) {
        //if (p1.type != p2.type) return false; // Temporary Line: Enemies don't collide with you.

        let colliding = ((Math.abs(p1.x - p2.x)) * 2 < (p1.xHitbox + p2.xHitbox)) &&
            ((Math.abs(p1.y - p2.y)) * 2 < (p1.yHitbox + p2.yHitbox));

        if (colliding) {
            p1.collide(p2);
            p2.collide(p1);
        }
    }

    public checkCollision(obj: Box2D) {
        if (!obj.canCollide) return;

        for (let i = 0; i < this.heroParticles.length; i++) {
            let particle: Particle = this.heroParticles[i];

            if (particle.type != obj.type && particle.canCollide)
                if (((Math.abs(particle.x - obj.x)) * 2 < (particle.xHitbox + obj.xHitbox)) &&
                    ((Math.abs(particle.y - obj.y)) * 2 < (particle.yHitbox + obj.yHitbox))) {
                    particle.collide(obj);
                    obj.collide(particle);
                }
        }

        for (let i = 0; i < this.enemyParticles.length; i++) {
            let particle: Particle = this.enemyParticles[i];

            if (particle.type != obj.type && particle.canCollide)
                if (((Math.abs(particle.x - obj.x)) * 2 < (particle.xHitbox + obj.xHitbox)) &&
                    ((Math.abs(particle.y - obj.y)) * 2 < (particle.yHitbox + obj.yHitbox))) {
                    particle.collide(obj);
                    obj.collide(particle);
                }
        }
    }


    public despawnAllEnemyParticles() {
        this.updateEnemyParticles = false;

        for (let i = 0; i < this.enemyParticles.length; i++) {
            let particle: Particle = this.enemyParticles[i];
            particle.canCollide = false;

            tween.from(particle).to({
                x: hero.x,
                y: hero.y
            }).then(() => {
                particle.alive = false;
                setTimeout(() => {
                    this.updateEnemyParticles = true;
                }, 2000)
            }).execute(400);
        }
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
        //console.log(obj);
        this.alive = false;
    }
}