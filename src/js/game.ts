
import Stars from "./lib/stars"
import Hero from "./lib/hero"
import ParticleManager from "./lib/particle"
import EnemyManager from "./lib/enemy"
import Overlay from "./lib/overlay"

export let width: number;
export let height: number;

export class Game {
    // Canvas
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    // Variables
    public width: number;
    public height: number;

    // ...
    public stars: Stars;
    public hero: Hero;
    private enemies: EnemyManager;
    private particles: ParticleManager;
    private overlay: Overlay;

    private keys: any; //string[];

    // This is called once before the game loads.
    public setup(): void {
        this.canvas = <HTMLCanvasElement> document.getElementById('canvas');
        width = this.canvas.width = window.innerWidth;
        height = this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        // ...
        this.keys = {}; // [];

        this.stars = new Stars();
        this.hero = new Hero();
        this.enemies = new EnemyManager();
        this.particles = new ParticleManager();
        this.overlay = new Overlay({
            hero: this.hero,
            enemies: this.enemies
        });
    }


    // This is called at best 60 times every second
    // Use this function for updating variables
    public update(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");

        // Variables
        width = this.canvas.width;
        height = this.canvas.height;

        // ...
        this.stars.update();
        this.hero.update(this.keys, this.particles);
        this.enemies.update(this.particles);
        this.particles.update();

        this.particles.checkCollision(this.hero);
        for (let i = 0; i < this.enemies.enemies.length; i++) {
            this.particles.checkCollision(this.enemies.enemies[i]);
        }

        this.overlay.update();
    }

    // This is called at best 60 times every second
    // Use this function for drawing
    public render(): void {
        // Background
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // ...
        this.stars.render(this.ctx);
        this.hero.render(this.ctx);
        this.enemies.render(this.ctx);
        this.particles.render(this.ctx);
        this.overlay.render(this.ctx);

        // Debug
        if (this.keys["f3"]) {
            let size = Math.floor(.05 * height);

            this.ctx.fillStyle = "white";
            this.ctx.font = size + "px Arial";
            this.ctx.fillText("" + this.stars.stars.length, this.canvas.width * .9, 20 + size);
            
            this.ctx.fillStyle = "green";
            this.ctx.font = size + "px Arial";
            this.ctx.fillText("" + this.particles.particles.length, this.canvas.width * .9, 20 + size * 2);
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
}