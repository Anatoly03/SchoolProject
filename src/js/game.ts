
export default class Game {
	// Canvas
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	// Variables
	public width: number;
	public height: number;

	// This is called once before the game loads.
	public setup(): void {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;
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
	}

	// This is called at best 60 times every second
	// Use this function for drawing
	public render(): void {
		// Background
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let b: number = 0;
        for (let i = 0; i < 10; i++) {
            b++;
            for (let j = 0; j < 10; j++) {
                b++;
                this.ctx.fillStyle = b%3 == 0 ? "black" : b%3 == 1 ? "white" : "red";
                
		        this.ctx.fillRect((this.canvas.width / 10) * i, (this.canvas.height / 10) * j, this.canvas.width / 10, this.canvas.height / 10);
            }
        }
	}
}