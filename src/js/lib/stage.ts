
import { width, height, ctx, keys, game, tween } from "../app";
import { enemies } from "../game";
import { TWEENING } from "./tween"
import { Enemy } from "./enemy"

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

    /*

    0: Stage Title Text
    1: Round Start: Bosses Appearing
    2: Mid game: FIGHT

    */
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

        let spawnedEnemies: Enemy[] = [];

        for (let i = 0; i < 6; i++) {
            let k = spawnedEnemies.push(enemies.add({
                x: .75 + i%2 * .1,
                y: -.1 - i/6 * .2,
                hp: 10,
                width: .025,
                height: .025,
                update: false,
            }));

            let e = spawnedEnemies[k - 1];

            tween.from(e).to({
                y: .3 - i/6 * .2,
            }).execute(1000, {
                delay: i * 500,
                tweening: TWEENING.BEZIER,
            });
        }

        for (let i = 0; i < 6; i++) {
            let k = spawnedEnemies.push(enemies.add({
                x: .25 - i%2 * .1,
                y: -.1 - i/6 * .2,
                hp: 2,
                width: .025,
                height: .025,
                update: false,
            }));

            let e = spawnedEnemies[k - 1];

            tween.from(e).to({
                y: .3 - i/6 * .2,
            }).execute(1000, {
                delay: i * 500,
                tweening: TWEENING.BEZIER,
            });
        }

        for (let i = 0; i < 6; i++) {
            let k = spawnedEnemies.push(enemies.add({
                x: .5 - (i%2 - 0.5) * .1,
                y: -.1 - Math.ceil(i/3) * .2,
                hp: 2,
                width: .025,
                height: .025,
                update: false,
            }));

            let e = spawnedEnemies[k - 1];

            tween.from(e).to({
                y: .3 - i/6 * .2,
            }).execute(1000, {
                delay: i * 500,
                tweening: TWEENING.BEZIER,
            });
        }

        tween.execute(4000).then(() => {
            for (let i = 0; i < spawnedEnemies.length; i++) {
                this.gameState = 2;
                spawnedEnemies[i].updateEnemy = true;
            }
        })
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

    public get inFight () {
        return this.gameState == 2
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