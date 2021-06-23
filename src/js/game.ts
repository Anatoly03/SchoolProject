
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

	// This is called once before the game loads.
	public setup(): void {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;

        // ...
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
        this.hero.update();
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
}