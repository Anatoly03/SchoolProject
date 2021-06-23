
export default class Stars {

    public stars: any[];

    // This is called once before the game loads.
    constructor() {
        this.stars = [];
    }

    // This is called at best 60 times every second
    // Use this function for updating variables
    public update(): void {
        if (this.stars.length < 10000)
            this.stars.push({
                x: Math.random(),
                y: 0,
                a: 0,
                w: Math.random(), // How close is a star? => Width, speed
            });

        let removedStars = 0;
        for (let i = 0; i < this.stars.length; i++) {
            let removeIt = false;
            let star = this.stars[i - removedStars];

            //let xDif = Math.abs(star.x - .5) / 50;
            //let yDif = Math.abs(star.y - .5) / 50;
            let yDif = .005 + star.w * .05

            //star.x += star.x > 0.5 ? xDif : -xDif
            //star.y += star.y > 0.5 ? yDif : -yDif
            star.y -= -yDif

            if (star.x < 0) removeIt = true;
            if (star.y < 0) removeIt = true;
            if (star.x > 1) removeIt = true;
            //if (star.y > 1) removeIt = true;

            if (star.y > .05)
                star.a += .1;
            else
                star.a -= .05;

            if (removeIt) {
                this.stars.splice(i - removedStars, 1);
                removedStars++;
            }
        }
    }

    public render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        for (let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i];

            //let xDif = (star.x - .5) * 100;
            //let yDif = (star.y - .5) * 100;
            let yDif = star.w * 100;

            //this.ctx.fillStyle = "white";
            //this.ctx.ellipse(this.canvas.width * star.x, this.canvas.height * star.y, 5, 5, 0, 0, 0);
            //this.ctx.fillRect(this.canvas.width * star.x, this.canvas.height * star.y, 5, 5);

            ctx.strokeStyle = `rgb(${255 * star.a}, ${255 * star.a}, ${255 * star.a})`

            ctx.beginPath();
            ctx.moveTo(canvas.width * star.x, canvas.height * star.y);
            ctx.lineTo(canvas.width * star.x, canvas.height * star.y + yDif);
            ctx.stroke();
        }
    }
}