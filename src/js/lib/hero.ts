
export default class Hero {

    public x: number;

    constructor() {
        this.x = .5;
    }

    public update(keys: any): void {
        console.log(keys["arrowright"]);
        if (keys["arrowright"] || keys["d"]) {
            this.x += .01;
            this.x = Math.min(.9, this.x);
        }
        if (keys["arrowleft"] || keys["a"]) {
            this.x -= .01;
            this.x = Math.max(.1, this.x);
        }
    }

    public render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        // Background
        ctx.fillStyle = "white";
        ctx.fillRect(canvas.width * this.x - 64, canvas.height * .8, 128, 128);
    }
}