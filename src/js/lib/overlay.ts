
import { width, height, ctx } from "../app";
import { hero, enemies } from "../game";

import { state } from "../game";

export default class Overlay {
    constructor() {
    }

    public update(): void {
    }

    public render(): void {
        if (state == 0) {
            // Health
            if (hero.hp > 0) {
                ctx.fillStyle = "rgb(50, 0, 0)";
                ctx.fillRect(
                    0,
                    0,
                    30,
                    height * .5 * hero.hp / hero.maxHp,
                );
            }

            // Energy
            if (hero.energy > 0) {
                ctx.fillStyle = "rgb(0, 0, 50)";
                ctx.fillRect(
                    0,
                    height * (1 - .5 * hero.energy / hero.maxEnergy),
                    30,
                    height * .5 * hero.energy / hero.maxEnergy,
                );
            }

            // Boss
            let bossHp = 0;
            let totalBossHp = 0;

            for (let enemy of enemies.enemies) {
                bossHp += enemy.hp;
                totalBossHp += enemy.maxHp;
            }

            ctx.fillStyle = "white";
            ctx.fillRect(
                width * .5 - 255,
                height * .01,
                510,
                50
            );
            if (bossHp > 0) {
                ctx.fillStyle = "black";
                ctx.fillRect(
                    width * .5 - 250,
                    height * .01 + 5,
                    500 * (bossHp / totalBossHp),
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