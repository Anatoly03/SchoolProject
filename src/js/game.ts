
export default class Game {
	// Canvas
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	// Variables
	public width: number;
	public height: number;

    // ...
    public stars: any[];

	// This is called once before the game loads.
	public setup(): void {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;

        this.stars = [];
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
        if (this.stars.length < 100)
            this.stars.push({
                x: Math.random(),
                y: Math.random(),
            });

        let removedStars = 0;
        for (let i = 0; i < this.stars.length; i++) {
            let removeIt = false;
            let star = this.stars[i - removedStars];
            
            let xDif = Math.abs(star.x - .5) / 100;
            let yDif = Math.abs(star.y - .5) / 100;

            star.x += star.x > 0.5 ? xDif : -xDif
            star.y += star.y > 0.5 ? yDif : -yDif

            if (star.x < 0) removeIt = true;
            if (star.y < 0) removeIt = true;
            if (star.x > 1) removeIt = true;
            if (star.y > 1) removeIt = true;

            if (removeIt) {
                this.stars.splice(i - removedStars, 1);
                removedStars++;
            }
        }
	}

	// This is called at best 60 times every second
	// Use this function for drawing
	public render(): void {
		// Background
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // ...
        for (let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i];

            //this.ctx.fillStyle = "white";
		    //this.ctx.ellipse(this.canvas.width * star.x, this.canvas.height * star.y, 5, 5, 0, 0, 0);
            //this.ctx.fillRect(this.canvas.width * star.x, this.canvas.height * star.y, 5, 5);

            this.ctx.strokeStyle = "white"

            this.ctx.beginPath();
            this.ctx.moveTo(this.canvas.width * star.x + 1, this.canvas.height * star.y + 1);
            this.ctx.lineTo(this.canvas.width * star.x, this.canvas.height * star.y);
            this.ctx.stroke();
        }
	}
}