
import { width, height, ctx, game, tween } from "../app";
import { hero, enemies, state } from "../game";
import { Content } from "./image"

export default class Overlay {
    private overlayDamaged: Content;

    constructor() {
        this.overlayDamaged = new Content('overlay-damaged');
        this.overlayDamaged.alpha = 0;
    }

    public update(): void {
    }

    public render(): void {
        if (state == 0) {
            // Health
            if (hero.hp > 0) {
                ctx.fillStyle = "rgb(50, 0, 0)";
                for (let i = 0; i < hero.hp; i++) {
                    ctx.fillRect(
                        5 + 55 * i,
                        5,
                        50,
                        50,
                    );
                }
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
            let bossHp = 1;
            let totalBossHp = 1;

            for (let enemy of enemies.enemies) {
                bossHp += enemy.hp;
                totalBossHp += enemy.maxHp;
            }

            if (bossHp > 0) {
                ctx.fillStyle = "rgb(100, 50, 0)";
                ctx.fillRect(
                    width - 30,
                    height * (1 - .5 * hero.energy / hero.maxEnergy),
                    30,
                    height * .5 * hero.energy / hero.maxEnergy,
                );
            }

            //console.log(this.tweenTest);
            /*ctx.strokeStyle = `rgb(${Math.floor(this.tweenTest.a)}, 0, 0)`;
            ctx.strokeRect(
                50,
                50,
                width - 100,
                height - 100,
            );*/
            this.overlayDamaged.render(0, 0, 1, 1);
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

    public simulateDamage(callback: () => void) {
        tween.from(this.overlayDamaged).to({
            alpha: 1,
        }).then(() => {

            tween.from(this.overlayDamaged).to({
                alpha: 0,
            }).then(() => {
                callback();
            }).execute(500, {
                delay: 2000
            });

        }).execute(100);
    }
}