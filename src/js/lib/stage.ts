
import { width, height, ctx, tween, game } from "../app";
import { particles } from "../game";
import { TWEENING } from "./tween"

import { stages } from "./stages"

export default class Stage {
    private level = 0; // ZERO IS DEFAULT
    private round = 0; // ZERO IS DEFAULT

    /*

    0: Stage Title Text
    1: Round Start: Bosses Appearing
    2: Mid game: FIGHT

    */
    private gameState = 0;
    private nextRoundCondition = () => false;

    private description: any = {
        type: 0,
        letters: 0,
        letters2: 0,
        shift: 0,
    };

    constructor() {
        this.executeLevel();
        //this.playFinishAnimation();
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
        if (this.description.type == 1) {
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
        } else if (this.description.type == 2) {
            ctx.fillStyle = `rgb(255, 255, 255, ${this.description.alpha || 0})`;
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = `black`;
            let total = Math.min(Math.floor(.9 / this.description.alpha), 500);
            for (let i = 0; i < total; i++) {
                let rX = Math.random() * width;
                let y = Math.random() * height;
                let length = Math.random() * .1 * total * height;

                ctx.beginPath();
                ctx.moveTo(rX, y);
                ctx.lineTo(rX, y + length);
                ctx.stroke();
            }

            let size = Math.floor(.3 * height);

            ctx.textAlign = "center";
            ctx.fillStyle = `rgb(0, 0, 0, ${this.description.text1})`;
            ctx.font = size + "px Yomogi";
            ctx.fillText("Victory!", width * .5, height * .3);
        }
    }

    /*

    aNiMaTiOnS

    */

    private startLevelAnimation() {
        this.description = {
            type: 1,
            letters: 0,
            letters2: 0,
            shift: 0,
        };

        if (particles.enemyParticles.length > 0)
            particles.despawnAllEnemyParticles();

        // Animation 1: Appear "Stage 1" Text
        tween.from(this.description).to({
            letters: 1,
        }).execute(2000)

            // Animation 2: Appear e.g. "Unexpected Adventure" Title
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

    private playFinishAnimation() {
        game.isTakingDamage = false;
        this.gameState = 2;

        this.description = {
            type: 2,
            alpha: 0,
            text1: 0,
        };

        // Animation 1: Whiten out screen
        tween.from(this.description).to({
            alpha: 1,
        }).execute(5000, {
            tweening: TWEENING.BEZIER,
        })

            // Animation 2: Appear "Victory" Text
            .next(1000, {
                delay: 500,
                tweening: TWEENING.BEZIER,
            }).to({
                text1: 1,
            }).then(() => {
                game.setState(1);
            })
    }

    /*

    Execute Level or Round

    */

    private executeLevel() {
        this.gameState = 1;
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
            //setTimeout(() => {
            this.playFinishAnimation();
            //}, 1000)
            return;
        }

        this.level++;
        particles.updateEnemyParticles = false;
        this.startLevelAnimation();
    }

    private nextRound() {
        if (this.round + 1 >= stages[this.level].rounds.length) {
            this.nextLevel();
            return;
        }

        this.round++;
        this.executeRound();
    }

    /*

    Are we mid a fight?

    */

    public get inFight() {
        return this.gameState == 2
    }
}
