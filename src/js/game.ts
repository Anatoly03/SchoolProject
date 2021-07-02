
import { width, height, ctx } from "./app";

import Stars from "./lib/stars"
import Hero from "./lib/hero"
import ParticleManager from "./lib/particle"
import EnemyManager from "./lib/enemy"
import Overlay from "./lib/overlay"

export let state: number;

export class Game {
    public stars: Stars;
    public hero: Hero;
    private enemies: EnemyManager;
    private particles: ParticleManager;
    private overlay: Overlay;

    private keys: any; //string[];

    // This is called once before the game loads.
    public setup(): void {
        this.keys = {};
        this.stars = new Stars();
        this.startGame();
    }


    // This is called at best 60 times every second
    // Use this function for updating variables
    public update(): void {
        this.stars.update();

        if (state == 0) {
            this.hero.update(this.keys, this.particles);
            this.enemies.update(this.particles);
            this.particles.update();

            this.particles.checkCollision(this.hero);
            for (let i = 0; i < this.enemies.enemies.length; i++) {
                this.particles.checkCollision(this.enemies.enemies[i]);
            }
        } else {
            if (this.keys["enter"] || this.keys[" "]) {
                this.startGame();
            }
        }

        this.overlay.update();

        if (this.hero.hp <= 0) {
            state = 1;
        }
    }

    // This is called at best 60 times every second
    // Use this function for drawing
    public render(): void {
        // Background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);

        // ...
        this.stars.render();

        if (state == 0) {
            this.hero.render();
            this.enemies.render();
            this.particles.render();
        }
        this.overlay.render();

        // Debug
        if (this.keys["f3"]) {
            let size = Math.floor(.05 * height);

            ctx.fillStyle = "white";
            ctx.font = size + "px Arial";
            ctx.fillText("" + this.stars.stars.length, width * .9, 20 + size);

            ctx.fillStyle = "green";
            ctx.font = size + "px Arial";
            ctx.fillText("" + this.particles.particles.length, width * .9, 20 + size * 2);
        }
    }

    public onKeyTouchBegan(key: string): void {
        //this.keys.push(key);
        /*if (this.keys[key])
            this.onKeyHold(key);
        else
            this.keys[key] = 0;*/
        this.keys[key] = true;
    }

    /*public onKeyHold(key: string): void {
        this.keys[key] = 1;
    }*/

    public onKeyTouchEnded(key: string): void {
        //this.keys = this.keys.filter(k => k != key)
        delete this.keys[key];
    }

    private startGame() {
        state = 0;
        this.hero = new Hero();
        this.enemies = new EnemyManager();
        this.particles = new ParticleManager();
        this.overlay = new Overlay({
            hero: this.hero,
            enemies: this.enemies
        });
    }
}