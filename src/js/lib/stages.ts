
import { width, height, ctx, keys, game, tween } from "../app";
import { enemies, hero, particles } from "../game";
import { TWEENING } from "./tween"
import { Enemy } from "./enemy"

import Stage from "./stage"
import { AIBehavior } from "./ai";

export let stages = [
    /*

    Stage 1: "Unexpected Adventure"

    ===============================
    
    

    */

    {
        name: "Stage 1",
        title: "Unexpected Adventure",
        rounds: [

            /*

                ### Round 1 ###
    
                Several enemies spawn on the top right.

                They automatically shoot nearby the player not hitting him.
                The objective of the first round is not to move.

            */

            (next: any) => {
                let spawnedEnemies: Enemy[] = [];

                for (let i = 0; i < 6; i++) {
                    let k = spawnedEnemies.push(enemies.add({
                        x: .75 - (i % 2 - 0.5) * .1,
                        y: -.1 - Math.floor(i / 2) * .02 / 3,
                        hp: 10,
                        width: .025,
                        height: .025,

                        ai: new AIBehavior({
                            data: {
                                canShoot: true,
                                canBurst: true,
                                shootBurst: 6,
                                currentBust: 6,
                                shootCooldown: 100,
                                burstCooldown: 3000,
                                posState: 1,
                            },
                            loop:
                                (parent: Enemy, ai: AIBehavior, next: () => void) => {
                                    if (ai.data.canShoot) {
                                        ai.data.canShoot = false;
                                        ai.data.currentBust--;

                                        if (ai.data.currentBust > 0)
                                            setTimeout(() => ai.data.canShoot = true, ai.data.shootCooldown);

                                        particles.emit({
                                            x: parent.x,
                                            y: parent.y,
                                            ySpeed: (hero.y - parent.y) * .015 + (i % 2 - 0.5) * .0005,
                                            xSpeed: (hero.x - parent.x) * .015 + (i % 2 - 0.5) * .0005,
                                            width: .005,
                                            height: .005,
                                            sender: "ENEMY",
                                        });
                                    }

                                    if (ai.data.posState == 1) {
                                        ai.data.posState = 0;

                                        if (ai.data.canBurst) {
                                            ai.data.currentBust = ai.data.shootBurst;
                                            ai.data.canShoot = true;
                                            ai.data.canBurst = false;
                                            setTimeout(() => ai.data.canBurst = true, ai.data.burstCooldown);
                                        }

                                        tween.from(spawnedEnemies[i]).to({
                                            x: .1 - (i % 2 - 0.5) * .1,
                                            //y: .5 - Math.floor(i / 2) * .2 / 3,
                                        }).execute(4000, {
                                            delay: 600 + i * 100,
                                            tweening: TWEENING.BEZIER,
                                        }).then(() => {
                                            ai.data.posState = 2;
                                        });
                                    } else if (ai.data.posState == 2) {
                                        ai.data.posState = 0;

                                        if (ai.data.canBurst) {
                                            ai.data.currentBust = ai.data.shootBurst;
                                            ai.data.canShoot = true;
                                            ai.data.canBurst = false;
                                            setTimeout(() => ai.data.canBurst = true, ai.data.burstCooldown);
                                        }

                                        tween.from(spawnedEnemies[i]).to({
                                            x: .75 - (i % 2 - 0.5) * .1,
                                            //y: .5 - Math.floor(i / 2) * .2 / 3,
                                        }).execute(4000, {
                                            delay: 600 + i * 100,
                                            tweening: TWEENING.BEZIER,
                                        }).then(() => {
                                            ai.data.posState = 1;
                                        });
                                    }
                                }
                        })
                    }));

                    let e = spawnedEnemies[k - 1];

                    tween.from(e).to({
                        y: .3 - Math.floor(i / 2) * .2 / 3,
                    }).execute(500, {
                        delay: i * 200,
                        tweening: TWEENING.BEZIER,
                    });
                }

                tween.execute(1400).then(() => {
                    next(() => enemies.length == 0);
                    for (let i = 0; i < spawnedEnemies.length; i++) {
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
                    next(() => enemies.length == 0);
                    for (let i = 0; i < spawnedEnemies.length; i++) {
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
                    next(() => enemies.length == 0);
                    for (let i = 0; i < spawnedEnemies.length; i++) {
                        spawnedEnemies[i].useAI = 1;
                    }
                });
            }
        ],
    }
]