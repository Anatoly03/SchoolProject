
import { width, height, state } from "../game";
import EnemyManager from "./enemy";
import Hero from "./hero";

export default class Overlay {
    public hero: Hero;
    public enemies: EnemyManager;

    constructor(params: { hero: Hero, enemies: EnemyManager }) {
        this.hero = params.hero;
        this.enemies = params.enemies;
    }

    public update(): void {
    }

    public render(ctx: CanvasRenderingContext2D): void {
        if (state == 0) {
            ctx.fillStyle = "white";
            ctx.fillRect(
                width * .01 - 5,
                height * .9,
                510,
                50
            );
            if (this.hero.hp > 0) {
                ctx.fillStyle = "red";
                ctx.fillRect(
                    width * .01,
                    height * .9 + 5,
                    500 * this.hero.hp / this.hero.maxHp,
                    40
                );
            }

            ctx.fillStyle = "white";
            ctx.fillRect(
                width * .99 - 515,
                height * .9,
                510,
                50
            );
            if (this.hero.energy > 0) {
                ctx.fillStyle = "blue";
                ctx.fillRect(
                    width * .99 - 510,
                    height * .9 + 5,
                    500 * this.hero.energy / this.hero.maxEnergy,
                    40
                );
            }
        } else {
            let size = Math.floor(.2 * height);
            ctx.textAlign = 'center';

            ctx.fillStyle = "white";
            ctx.font = size + "px Arial";
            ctx.fillText("Game over!", width * .5, height * .5);

            ctx.fillStyle = "white";
            ctx.font = Math.floor(size / 3) + "px Arial";
            ctx.fillText("You suck at this game! LMAO, noob!", width * .5, height * .75);
        }
    }
}