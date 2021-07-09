
let tweens: TweenObject[] = [];

export class Tween {
    constructor() {
    }

    public update(): void {
        for (let i = 0; i < tweens.length; i++) {
            tweens[i].update();
        }

        tweens = tweens.filter(e => !e.isFinished);
    }

    public from(params: object): TweenObject {
        let tween = new TweenObject(params)
        tweens.push(tween);
        return tween;
    }

    public execute(ms: number, params?: any): TweenObject {
        let tween = this.from({}).to({}).execute(ms, params)
        return tween;
    }
}

/*
    TWEEN TYPE: (start, end, percentage)
*/

type TweeningType = (percentage: number) => number;

export let TWEENING: { [key: string]: TweeningType} = {
    LINEAR: (p) => p,
    EASE_IN: (p) => p * p,
    BEZIER: (p) => p * p * (3 - 2 * p),
}

class TweenObject {
    public isFinished: boolean;

    private data: any;
    private callback: (params: any) => void;

    private originalState: any;
    private finishedState: any;
    private animating: boolean;

    private ms: number;
    private finishOn: number;
    private startOn: number;

    private tweening: TweeningType;

    constructor(params: object) {
        this.originalState = {};
        this.finishedState = {};
        this.animating = false;
        this.ms = 1000;
        this.isFinished = false;

        this.data = params;
    }

    public update(): void {
        if (this.animating) {
            if (this.finishOn - Date.now() < 0) {
                this.finish();
                return;
            }

            //console.log(this.data, this.originalState);
            if (this.startOn - Date.now() < 0) {
                for (let p in this.originalState) {
                    let start = this.originalState[p];
                    let end = this.finishedState[p];
    
                    if (typeof start == "number") {
                        let percentage = 1 - (this.finishOn - Date.now()) / this.ms;
                        this.data[p] = start + this.tweening(percentage) * (end - start);
                    }
                }
            }
        }
    }

    public to(params: any): TweenObject {
        // Define
        for (let p in params) {
            if (this.data[p] == undefined) continue;

            /*&& typeof this.data[p] == typeof params[p]*/
            this.originalState[p] = this.data[p];
            this.finishedState[p] = params[p];
        }

        return this;
    }

    public execute(ms: number, params?: any): TweenObject {
        this.animating = true;
        this.ms = ms;
        this.startOn = Date.now();

        if (params) {
            if (params.delay)
                this.startOn = Date.now() + params.delay;
        }
        this.finishOn = this.startOn + ms;
        this.tweening = params?.tweening || TWEENING.LINEAR;

        return this;
    }

    public then(callback: () => void): TweenObject {
        this.callback = callback;
        return this;
    }

    public finish() {
        this.animating = false;
        this.isFinished = true;
        if (this.callback) this.callback(this.data);
    }

    public next(ms: number, params?: any): TweenObject {
        let nextAnimation = new TweenObject(this.data)
        tweens.push(nextAnimation);

        this.callback = () => {
            nextAnimation.execute(ms, params);
        }

        return nextAnimation;
    }
}

/*class TweenChildObject extends TweenObject {
    constructor(params: any) {
        super(params);
    }
}*/