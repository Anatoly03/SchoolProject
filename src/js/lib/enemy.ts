
import { width, height, ctx, game } from "../app";
import { particles } from "../game";

import Box2D from "./box2d";
import { AIBehavior } from "./ai";

export default class EnemyManager {
    public enemies: Enemy[];

    constructor() {
        this.enemies = [];

        /*this.add({
            x: .2,
            y: .1,
            hp: 100,
            width: .05,
            height: .025,
        });

        this.add({
            x: .8,
            y: .1,
            hp: 100,
            width: .05,
            height: .025,
        });

        this.enemies[1].shootCooldown = 500;
        this.enemies[0].shootCooldown = 200;*/
    }

    public update(): void {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
        }

        this.enemies = this.enemies.filter(p => p.alive);
    }

    public render(): void {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].render();
        }
    }

    public add(params: any): Enemy {
        let e = new Enemy(params);
        this.enemies.push(e);
        return e;
    }

    public get length() {
        return this.enemies.length;
    }
}

export class Enemy extends Box2D {

    public hp: number;
    public maxHp: number;

    public ai: AIBehavior;
    public useAI: number;

    constructor(params: any) {
        params.type = "ENEMY";
        super(params);

        this.hp = params.hp || 5;
        this.maxHp = params.maxHp || this.hp;

        this.ai = params.ai || new AIBehavior(params);
        this.useAI = 0;
    }

    public update(): void {
        if (this.useAI == 1) {
            this.ai.update(this);
        }
    }

    public render(): void {
        ctx.fillStyle = "red";
        ctx.fillRect(
            width * this.x - width * this.w * .5,
            height * this.y - height * this.h * .5,
            width * this.w,
            height * this.h
        );
    }

    public collide(obj: Box2D) {
        //console.log(obj.type);
        this.hp -= 1;
    }

    public get alive(): boolean {
        return this.hp > 0;
    }
}