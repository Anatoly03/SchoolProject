
import { width, height, ctx } from "../app";

const images: { [key: string]: any; } = {
    'bullet-hero': {
        src: 'assets/bullet-hero.png',
        animated: true,
        frames: 4,
        fps: 1,
        size: {
            w: 11,
            h: 21,
        }
    },
};

export class Content {
    private img: HTMLImageElement;

    private animated: boolean;
    private fps: number;
    private frames: number;
    private frame: number;

    private incrementFrame: boolean;

    private w: number;
    private h: number;

    constructor(name: string) {
        let data = images[name];

		this.img = new Image();
        this.img.src = data.src;

        this.animated = data.animated;
        this.frames = data.frames;
        this.fps = data.fps;
        this.frame = 0;
        this.incrementFrame = true;

        this.w = data.size.w;
        this.h = data.size.h;
    }

    public update(): void {
        if (this.incrementFrame && this.animated) {
            this.incrementFrame = false;
            setTimeout(() => this.incrementFrame = true, Math.ceil(60 / this.fps));
            this.frame += 1;
            this.frame %= this.frames;
        }
    }

    public render(x: number, y: number, w: number): void {
        ctx.drawImage(this.img,
            // Image Part
            this.frame * this.w, 0, this.w, this.h,
            // Position
            Math.floor(width * x), Math.floor(height * y), width * w, width * w
        );
    }
}