
import { width, height, ctx } from "../app";

const images: { [key: string]: any; } = {
    'bullet-hero': {
        src: 'assets/bullet-hero.png',
        alpha: 0.1,
        animated: true,
        frames: 4,
        fps: 1,
        size: {
            w: 11,
            h: 21,
        }
    },
    'overlay-damaged': {
        alpha: 1,
        src: 'assets/overlay-damaged.png', // assets/overlay-damaged.png
    },
};

export class Content {
    private img: HTMLImageElement;

    public alpha: number;

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

        this.frame = 0;
        this.alpha = 1;

        if (data.animated) {
            this.animated = data.animated;
            this.frames = data.frames;
            this.fps = data.fps;
            this.incrementFrame = true;
        } else {
            this.animated = false;
        }

        if (data.alpha) this.alpha = data.alpha;

        if (data.size) {
            this.w = data.size.w;
            this.h = data.size.h;
        } else {
            this.w = this.img.width;
            this.h = this.img.height;
        }
    }

    public update(): void {
        if (this.incrementFrame && this.animated) {
            this.incrementFrame = false;
            setTimeout(() => this.incrementFrame = true, Math.ceil(60 / this.fps));
            this.frame += 1;
            this.frame %= this.frames;
        }
    }

    public render(x: number, y: number, w: number, h?:number): void {
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.img,
            // Image Part
            this.frame * this.w, 0, this.w, this.h,
            // Position
            Math.floor(width * x),
            Math.floor(height * y),
            Math.floor(width * w),
            Math.floor(height * (h || w))
        );
        ctx.globalAlpha = 1;
    }
}