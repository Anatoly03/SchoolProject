
import { width, height } from "../game";
import EnemyManager from "./enemy";
import Hero from "./hero";

export default class Overlay {
    public hero: Hero;
    public enemies: EnemyManager;

    constructor(params: {hero: Hero, enemies: EnemyManager}) {
        this.hero = params.hero;
        this.enemies = params.enemies;
    }

    public update(): void {
        
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "white";
        ctx.fillRect(
            width * .01 - 5,
            height * .9,
            510,
            50
        );
        ctx.fillStyle = "red";
        ctx.fillRect(
            width * .01,
            height * .9 + 5,
            500 * this.hero.hp / this.hero.maxHp,
            40
        );
    }
}