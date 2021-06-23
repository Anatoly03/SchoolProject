
export default class Hero {

    public x: number;

    constructor() {
        this.x = .5;
    }

    public update(): void {
    }

    public render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
		// Background
		ctx.fillStyle = "white";
		ctx.fillRect(canvas.width * this.x - 64, canvas.height * .8, 128, 128);
    }
}