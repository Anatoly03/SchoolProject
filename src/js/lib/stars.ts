
import { width, height, ctx } from "../app";

export default class Stars {

    public stars: any[];

    // This is called once before the game loads.
    constructor() {
        this.stars = [];

        for (let i = 0; i < 150; i++) {
            this.addStar(true);
        }
    }

    public update(): void {
        this.addStar(false);
        this.updateStars();
    }

    private addStar(pre: boolean): void {
        let x = Math.random();
        let random = .5;

        this.stars.push({
            x: x,
            y: pre ? Math.random() : 0,
            a: 0,
            w: Math.abs(Math.abs(x - .5) + (Math.random() - .5) * random),
            // How close is a star? => Width, speed
            // Calculation: Further from the centre a star, the higher the width + random
        });
    }

    private updateStars(): void {
        let removedStars = 0;
        for (let i = 0; i < this.stars.length; i++) {
            let removeIt = false;
            let star = this.stars[i - removedStars];

            //let xDif = Math.abs(star.x - .5) / 50;
            //let yDif = Math.abs(star.y - .5) / 50;
            let yDif = .005 + star.w * .05 - Math.abs(star.x - .5) * .02 // star.w * .005

            //star.x += star.x > 0.5 ? xDif : -xDif
            //star.y += star.y > 0.5 ? yDif : -yDif
            star.y -= -yDif

            //if (star.y > 0) removeIt = true;
            if (star.y > 1) removeIt = true;

            if (star.a < 1)
                star.a += .1; // .1
            else if (star.y > .5)
                star.a -= .1;

            if (removeIt) {
                this.stars.splice(i - removedStars, 1);
                removedStars++;
            }
        }
    }

    public render(): void {
        for (let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i];

            //let xDif = (star.x - .5) * 100;
            //let yDif = (star.y - .5) * 100;
            let yDif = star.w * 100;

            //this.ctx.fillStyle = "white";
            //this.ctx.ellipse(this.canvas.width * star.x, this.canvas.height * star.y, 5, 5, 0, 0, 0);
            //this.ctx.fillRect(this.canvas.width * star.x, this.canvas.height * star.y, 5, 5);

            ctx.strokeStyle = `rgb(${star.w * 255 * star.a}, ${star.w * 255 * star.a}, ${star.w * 255 * star.a})`

            ctx.beginPath();
            ctx.moveTo(width * star.x, height * star.y);
            ctx.lineTo(width * star.x, height * star.y + yDif);
            ctx.stroke();
        }
    }
    
    public get length() {
        return this.stars.length;
    }
}