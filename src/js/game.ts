
import Stars from "./stars"

export default class Game {
	// Canvas
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	// Variables
	public width: number;
	public height: number;

    // ...
    public stars: Stars;

	// This is called once before the game loads.
	public setup(): void {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;

        this.stars = new Stars();
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

        // Stars
        this.stars.update();
	}

	// This is called at best 60 times every second
	// Use this function for drawing
	public render(): void {
		// Background
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Stars
        this.stars.render(this.canvas, this.ctx);
	}
}