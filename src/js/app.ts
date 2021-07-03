import { Game } from './game';
import { Tween } from './lib/tween';

export let width: number;
export let height: number;
export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
export let keys: { [key: string]: boolean; } = {};

class App {
	public game: Game;
	public tween: Tween;

	constructor() {
		this.tween = new Tween();
		this.game = new Game();
	}

	public setup(): void {
		canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.setVariables();
		this.addEventLiteners();
		this.game.setup();
	}

	public gameLoop(): void {
		requestAnimationFrame(this.gameLoop.bind(this));
		this.setVariables();
		this.tween.update();
		this.game.update();
		this.game.render();
	}

	private setVariables(): void {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
		ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;

        // Background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
	}

	private addEventLiteners(): void {
		// document.addEventListener('mouseover', event => {});
		// document.addEventListener('click', event => {});

		document.addEventListener('keydown', event => {
			keys[event.key.toLowerCase()] = true;
		});

		document.addEventListener('keyup', event => {
			delete keys[event.key.toLowerCase()];
		});
	}
}

export let app = new App();
export let game = app.game;
export let tween = app.tween;

window.onload = () => {
	app.setup();
	app.gameLoop();
}