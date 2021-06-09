
export default class Game {
	// Canvas
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	// Variables
	public width: number;
	public height: number;

    // ...
    public stars: any[];
    public stars4d: any[];

	// This is called once before the game loads.
	public setup(): void {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;

        this.stars = [];
        this.stars4d = [];
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
        if (this.stars.length < 10000)
            this.stars.push({
                x: Math.random(),
                y: Math.random(),
                a: 0,
            });

        let removedStars = 0;
        for (let i = 0; i < this.stars.length; i++) {
            let removeIt = false;
            let star = this.stars[i - removedStars];
            
            let xDif = Math.abs(star.x - .5) / 50;
            let yDif = Math.abs(star.y - .5) / 50;

            star.x += star.x > 0.5 ? xDif : -xDif
            star.y += star.y > 0.5 ? yDif : -yDif

            if (star.x < 0) removeIt = true;
            if (star.y < 0) removeIt = true;
            if (star.x > 1) removeIt = true;
            if (star.y > 1) removeIt = true;

            if (star.a < 1) star.a += .05;

            if (removeIt) {
                this.stars.splice(i - removedStars, 1);
                removedStars++;
            }
        }

        // ... 4D
        /*if (this.stars4d.length < 100)
            this.stars4d.push({
                x: Math.random(),
                y: Math.random(),
            });*/

        let removedStars4d = 0;
        for (let i = 0; i < this.stars4d.length; i++) {
            let removeIt = false;
            let star = this.stars4d[i - removedStars4d];
            
            let xDif = Math.abs(star.y - .5) / 100;
            let yDif = Math.abs(star.x - .5) / 100;

            star.x += star.x > 0.5 ? xDif : -xDif
            star.y += star.y > 0.5 ? yDif : -yDif

            if (star.x < 0) removeIt = true;
            if (star.y < 0) removeIt = true;
            if (star.x > 1) removeIt = true;
            if (star.y > 1) removeIt = true;

            if (removeIt) {
                this.stars4d.splice(i - removedStars4d, 1);
                removedStars4d++;
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

            let xDif = (star.x - .5) * 100;
            let yDif = (star.y - .5) * 100;

            //this.ctx.fillStyle = "white";
		    //this.ctx.ellipse(this.canvas.width * star.x, this.canvas.height * star.y, 5, 5, 0, 0, 0);
            //this.ctx.fillRect(this.canvas.width * star.x, this.canvas.height * star.y, 5, 5);

            console.log(star.a);
            this.ctx.strokeStyle = `rgb(${255 * star.a}, ${255 * star.a}, ${255 * star.a})`

            this.ctx.beginPath();
            this.ctx.moveTo(this.canvas.width * star.x, this.canvas.height * star.y);
            this.ctx.lineTo(this.canvas.width * star.x + xDif, this.canvas.height * star.y + yDif);
            this.ctx.stroke();
        }

        // ... 4D
        for (let i = 0; i < this.stars4d.length; i++) {
            let star = this.stars4d[i];

            this.ctx.strokeStyle = "white"

            this.ctx.beginPath();
            this.ctx.moveTo(this.canvas.width * star.x + 1, this.canvas.height * star.y + 1);
            this.ctx.lineTo(this.canvas.width * star.x, this.canvas.height * star.y);
            this.ctx.stroke();
        }
	}
}