
import { width, height, ctx, tween } from "../app";
import { enemies, particles } from "../game";
import { TWEENING } from "./tween"
import { Enemy } from "./enemy"

import { stages } from "./stages"

export default class Stage {
    private level = 0;
    private round = 0;

    /*

    0: Stage Title Text
    1: Round Start: Bosses Appearing
    2: Mid game: FIGHT

    */
    private gameState = 0;
    private nextRoundCondition = () => false;

    private description = {
        showing: false,
        letters: 0,
        letters2: 0,
        shift: 0,
    };

    constructor() {
        this.executeLevel();
    }

    public update() {
        if (this.gameState == 1) {
            //
        }

        if (this.nextRoundCondition()) {
            this.nextRoundCondition = () => false;
            this.nextRound();
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
        this.gameState = 0;

        this.description = {
            showing: true,
            letters: 0,
            letters2: 0,
            shift: 0,
        };

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
                this.executeRound();
            })
    }

    /*

    Execute Level or Round

    */

    private executeLevel() {
        this.gameState = 1;

        //let level = stages[this.level];
        this.round = 0;
        this.startLevelAnimation();
    }

    private executeRound() {
        let that = this;

        function next(condition: () => boolean) {
            that.gameState = 2;
            that.nextRoundCondition = condition;
        }

        let round = stages[this.level].rounds[this.round];
        this.gameState = 1;

        round(next);
    }

    /*

    Increment Level or Round

    */

    private nextLevel() {
        if (this.level + 1 >= stages.length) {
            // Finished with the game
            return;
        }
        
        this.level ++;
        this.startLevelAnimation();
    }

    private nextRound() {
        if (this.round + 1 >= stages[this.level].rounds.length) {
            this.nextLevel();
            return;
        }

        this.round ++;
        this.executeRound();
    }

    /*

    Are we mid a fight?

    */

    public get inFight () {
        return this.gameState == 2
    }
}
