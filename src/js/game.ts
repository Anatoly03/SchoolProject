
import { width, height, ctx, keys } from "./app";

import Stars from "./lib/stars"
import Hero from "./lib/hero"
import ParticleManager from "./lib/particle"
import EnemyManager from "./lib/enemy"
import Overlay from "./lib/overlay"

export let state: number;

export let stars: Stars;
export let hero: Hero;
export let enemies: EnemyManager;
export let particles: ParticleManager;
export let overlay: Overlay;

export class Game {
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
            enemies.update();
            particles.update();
        } else {
            if (keys["enter"]) {
                this.startGame();
            }
        }

        overlay.update();

        if (hero.hp <= 0) {
            state = 1;
        }
    }

    // This is called at best 60 times every second
    // Use this function for drawing
    public render(): void {
        // Background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);

        stars.render();

        if (state == 0) {
            hero.render();
            enemies.render();
            particles.render();
        }
        overlay.render();

        // Debug
        if (keys["f3"]) {
            let size = Math.floor(.05 * height);

            ctx.fillStyle = "white";
            ctx.font = size + "px Arial";
            ctx.fillText("" + stars.length, width * .9, 20 + size);

            ctx.fillStyle = "green";
            ctx.font = size + "px Arial";
            ctx.fillText("" + particles.length, width * .9, 20 + size * 2);
        }
    }

    private startGame() {
        state = 0;
        hero = new Hero();
        enemies = new EnemyManager();
        particles = new ParticleManager();
        overlay = new Overlay();
    }
}