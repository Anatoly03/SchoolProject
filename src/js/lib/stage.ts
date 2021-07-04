
import { width, height, ctx, keys, game, tween } from "../app";
import { enemies } from "../game";

let stages = [
    {
        name: "Stage 1",
        title: "Unexpected Adventure",
        rounds: [
            () => {
                //
            },
        ],
    }
]

export default class Stage {
    private level = 0;
    private round = 0;
    private gameState = 0;

    private description = {
        showing: false,
        letters: 0,
        letters2: 0,
        shift: 0,
    };

    constructor() {
        this.startLevelAnimation();
    }

    public update() {
        if (this.gameState == 1) {
            //
        }
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
            ctx.fillText(stages[this.level].title.substring(0, Math.ceil(stages[this.level].title.length * this.description.letters2)), (width - k.width) * .5 + this.description.shift * width * 2, height * .6);

            ctx.fillStyle = `rgb(255, 255, 255, ${.9 - this.description.shift})`;
            ctx.fillRect((width - k.width) * .5, height * .6 + size * .3, k.width * this.description.letters, 5);
        }
    }

    private startLevelAnimation() {
        this.description.showing = true;
        this.gameState = 0;

        // Animation 1: Appear "Stage 1" Text
        tween.from(this.description).to({
            letters: 1,
        }).execute(2000)

            // Animation 2: Appear "Unexpedt Adventure" Title
            .next(1500, {
                delay: 1000,
            }).to({
                letters2: 1,
            })

            // Animation 3: Disappear title
            .next(500, {
                delay: 1000,
            }).to({
                shift: 1,
            })

            // Start Level
            .then(() => {
                this.executeLevel();
            })
    }

    private executeLevel() {
        let round = stages[this.level].rounds[this.round];
        this.gameState = 1;

    }

    private nextRound() {
        if (this.round + 1 >= stages[this.level].rounds.length) {
            // Next Level instead
            return;
        }

        this.round ++;

        let round = stages[this.level].rounds[this.round];
        this.gameState = 1;

    }

    private nextLevel() {
        if (this.level + 1 >= stages.length) {
            // Finished with the game
            return;
        }
        
        this.level ++;
        this.round = 0;

        let level = stages[this.level];

    }

    /*

    ** GAMEPLAY STUFF **

    */

    private spawn(type: string, params?: any) {
        switch (type) {
            case "mob_group_1": MobGroup1(params || {}); break;
        }
    }
}

function MobGroup1(params: any) {

}