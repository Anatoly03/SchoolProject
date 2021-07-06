
import { width, height, ctx, keys, game, tween } from "../app";
import { enemies } from "../game";
import { TWEENING } from "./tween"
import { Enemy } from "./enemy"

import Stage from "./stage"

export let stages = [
    /*

    Stage 1: "Unexpected Adventure"

    ===============================
    
    

    */

    {
        name: "Stage 1",
        title: "Unexpected Adventure",
        rounds: [
            (next: any) => {
                let spawnedEnemies: Enemy[] = [];

                for (let i = 0; i < 6; i++) {
                    let k = spawnedEnemies.push(enemies.add({
                        x: .75 - (i % 2 - 0.5) * .1,
                        y: -.1 - Math.floor(i / 2) * .02 / 3,
                        hp: 2,
                        width: .025,
                        height: .025,
                        update: false,
                    }));

                    let e = spawnedEnemies[k - 1];

                    tween.from(e).to({
                        y: .3 - Math.floor(i / 2) * .2 / 3,
                    }).execute(500, {
                        delay: i * 500,
                        tweening: TWEENING.BEZIER,
                    });
                }

                tween.execute(4000).then(() => {
                    for (let i = 0; i < spawnedEnemies.length; i++) {
                        next(() => enemies.length == 0);
                        spawnedEnemies[i].useAI = 1;
                    }
                });
            }
        ],
    },

    /*

    Stage N

    ======
    
    

    */

    {
        name: "Stage N",
        title: "Bullet March",
        rounds: [
            (next: any) => {
                let spawnedEnemies: Enemy[] = [];

                for (let i = 0; i < 6; i++) {
                    let k = spawnedEnemies.push(enemies.add({
                        x: .5 - (i % 2 - 0.5) * .1,
                        y: -.1 - Math.floor(i / 2) * .02 / 3,
                        hp: 2,
                        width: .025,
                        height: .025,
                        update: false,
                    }));

                    let e = spawnedEnemies[k - 1];

                    tween.from(e).to({
                        y: .3 - Math.floor(i / 2) * .2 / 3,
                    }).execute(500, {
                        delay: i * 500,
                        tweening: TWEENING.BEZIER,
                    });
                }

                tween.execute(4000).then(() => {
                    for (let i = 0; i < spawnedEnemies.length; i++) {
                        next(() => enemies.length == 0);
                        spawnedEnemies[i].useAI = 1;
                    }
                });
            },
            (next: any) => {
                let spawnedEnemies: Enemy[] = [];

                for (let i = 0; i < 6; i++) {
                    let k = spawnedEnemies.push(enemies.add({
                        x: .75 + i % 2 * .1,
                        y: -.1 - i / 6 * .2,
                        hp: 10,
                        width: .025,
                        height: .025,
                        update: false,
                    }));

                    let e = spawnedEnemies[k - 1];

                    tween.from(e).to({
                        y: .3 - i / 6 * .2,
                    }).execute(500, {
                        delay: i * 500,
                        tweening: TWEENING.BEZIER,
                    });
                }

                for (let i = 0; i < 6; i++) {
                    let k = spawnedEnemies.push(enemies.add({
                        x: .25 - i % 2 * .1,
                        y: -.1 - i / 6 * .2,
                        hp: 2,
                        width: .025,
                        height: .025,
                        update: false,
                    }));

                    let e = spawnedEnemies[k - 1];

                    tween.from(e).to({
                        y: .3 - i / 6 * .2,
                    }).execute(500, {
                        delay: i * 500,
                        tweening: TWEENING.BEZIER,
                    });
                }

                for (let i = 0; i < 6; i++) {
                    let k = spawnedEnemies.push(enemies.add({
                        x: .5 - (i % 2 - 0.5) * .1,
                        y: -.1 - Math.floor(i / 2) * .02 / 3,
                        hp: 2,
                        width: .025,
                        height: .025,
                        update: false,
                    }));

                    let e = spawnedEnemies[k - 1];

                    tween.from(e).to({
                        y: .3 - Math.floor(i / 2) * .2 / 3,
                    }).execute(500, {
                        delay: i * 500,
                        tweening: TWEENING.BEZIER,
                    });
                }

                tween.execute(4000).then(() => {
                    for (let i = 0; i < spawnedEnemies.length; i++) {
                        next(() => enemies.length == 0);
                        spawnedEnemies[i].useAI = 1;
                    }
                });
            }
        ],
    }
]

//function 