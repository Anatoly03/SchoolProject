
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
            ctx.fillStyle = "white";
            ctx.fillRect(
                width * .01 - 5,
                height * .9,
                510,
                50
            );
            if (hero.hp > 0) {
                ctx.fillStyle = "red";
                ctx.fillRect(
                    width * .01,
                    height * .9 + 5,
                    500 * hero.hp / hero.maxHp,
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
            if (hero.energy > 0) {
                ctx.fillStyle = "blue";
                ctx.fillRect(
                    width * .99 - 510,
                    height * .9 + 5,
                    500 * hero.energy / hero.maxEnergy,
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