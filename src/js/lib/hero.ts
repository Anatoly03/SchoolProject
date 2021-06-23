
import ParticleManager from "./particle"

export default class Hero {

    public x: number;

    public canShoot: boolean;
    public shootCooldown: number;

    constructor() {
        this.x = .5;
        this.canShoot = true;
        this.shootCooldown = 250;
    }

    public update(keys: any, particles: ParticleManager): void {
        if (keys["arrowright"] || keys["d"]) {
            this.x += .005;
            this.x = Math.min(.9, this.x);
        }

        if (keys["arrowleft"] || keys["a"]) {
            this.x -= .005;
            this.x = Math.max(.1, this.x);
        }

        // console.log(keys);

        if (keys[" "] && this.canShoot) {
            this.canShoot = false;
            setTimeout(() => this.canShoot = true, this.shootCooldown);
            this.shoot(particles);
        }
    }

    public render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "white";
        ctx.fillRect(canvas.width * this.x - 64, canvas.height * .8, 128, 128);
    }

    // Hero Methods

    public shoot(particles: ParticleManager): void {
        particles.add({
            x: this.x,
            y:  .8,
            yVel: -.01,
        })
    }
}