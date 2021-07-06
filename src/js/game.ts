
import { width, height, ctx, keys, game } from "./app";

import Stars from "./lib/stars"
import Hero from "./lib/hero"
import ParticleManager from "./lib/particle"
import EnemyManager from "./lib/enemy"
import Overlay from "./lib/overlay"
import Stage from "./lib/stage"

export let stars: Stars;
export let hero: Hero;
export let enemies: EnemyManager;
export let particles: ParticleManager;
export let overlay: Overlay;
export let state: number;

export class Game {
    public stage: Stage;
    public isTakingDamage: boolean;

    // This is called once before the game loads.
    public setup(): void {
        stars = new Stars();
        this.startGame();
    }

    // This is called at best 60 times every second
    // Use this function for updating variables
    public update(): void {
        stars.update();

        if (state == 0) {
            hero.update();
            particles.update();
            enemies.update();
        } else {
            if (keys["enter"]) {
                this.startGame();
            }
        }

        overlay.update();
        this.stage.update();

        if (hero.hp <= 0) {
            state = 1;
        }
    }

    // This is called at best 60 times every second
    // Use this function for drawing
    public render(): void {
        stars.render();

        if (state == 0) {
            hero.render();
            particles.render();
            enemies.render();
        }
        overlay.render();
        this.stage.render();

        // Debug
        if (keys["f3"]) {
            let size = Math.floor(.05 * height);

            ctx.fillStyle = "white";
            ctx.font = size + "px Arial";
            ctx.fillText("" + stars.length, width * .9, 20 + size);

            ctx.fillStyle = "green";
            ctx.font = size + "px Arial";
            ctx.fillText("" + (particles.enemyParticles.length + particles.heroParticles.length), width * .9, 20 + size * 2);
        }
    }

    private startGame() {
        state = 0;
        hero = new Hero();
        enemies = new EnemyManager();
        particles = new ParticleManager();
        overlay = new Overlay();
        this.stage = new Stage();
        this.isTakingDamage = true;
    }

    public takeDamage() {
        if (this.isTakingDamage) {
            this.isTakingDamage = false;
            particles.despawnAllEnemyParticles();
            overlay.simulateDamage(() => {
                this.isTakingDamage = true;
            })
        }
    }
}