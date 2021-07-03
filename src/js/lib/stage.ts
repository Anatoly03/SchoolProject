
import { width, height, ctx, keys, game, tween } from "../app";
import { enemies } from "../game";

let stages = [
    {
        name: "Stage 1",
        title: "Unexpected Adventure"
    }
]

export default class Stage {
    private level = 0;
    private isBossAppearing = true;

    private description = {
        showing: false,
        letters: 0,
        letters2: 0,
        shift: 0,
    };

    constructor() {
        this.startLevelAnimation();
    }

    public render() {
        if (this.description.showing) {
            let size = Math.floor(.05 * height);

            ctx.textAlign = "left";
            ctx.fillStyle = `rgb(255, 255, 255, ${.9 - this.description.shift})`;
            ctx.font = size + "px Yomogi";
            ctx.fillText(stages[this.level].name.substring(0, Math.ceil(stages[this.level].name.length * this.description.letters)), width * .2, height * .3);

            size = Math.floor(.2 * height);

            ctx.fillStyle = "yellow";
            ctx.font = size + "px Zen Tokyo Zoo";
            let k = ctx.measureText(stages[this.level].title)
            ctx.fillText(stages[this.level].title.substring(0, Math.ceil(stages[this.level].title.length * this.description.letters2)), (width - k.width) *.5 + this.description.shift * width * 2, height * .6);

            ctx.fillStyle = `rgb(255, 255, 255, ${.9 - this.description.shift})`;
            ctx.fillRect((width - k.width) * .5, height * .6 + size * .3, k.width * this.description.letters, 5);
        }
    }

    public startLevelAnimation() {
        this.description.showing = true;

        tween.from(this.description).to({
            letters: 1,
        }).then(() => {
            tween.from(this.description).to({
                letters2: 1,
            }).then(() => {
                tween.from(this.description).to({
                    shift: 1,
                }).then(() => {
                    //
                }).execute(1000, {
                    delay: 1000,
                });
            }).execute(1500, {
                delay: 1000,
            });
        }).execute(2000);
    }
}