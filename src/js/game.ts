
import Stars from "./lib/stars"
import Hero from "./lib/hero"

export default class Game {
    // Canvas
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    // Variables
    public width: number;
    public height: number;

    // ...
    public stars: Stars;
    public hero: Hero;

    private keys: any; //string[];

    // This is called once before the game loads.
    public setup(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        // ...
        this.keys = {}; // [];

        this.stars = new Stars();
        this.hero = new Hero();
    }


    // This is called at best 60 times every second
    // Use this function for updating variables
    public update(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");

        // Variables
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // ...
        this.stars.update();
        this.hero.update(this.keys);
    }

    // This is called at best 60 times every second
    // Use this function for drawing
    public render(): void {
        // Background
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // ...
        this.stars.render(this.canvas, this.ctx);
        this.hero.render(this.canvas, this.ctx);
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