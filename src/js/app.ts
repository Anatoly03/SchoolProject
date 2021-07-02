import { Game } from './game';

export let width: number;
export let height: number;
export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
export let keys: { [key: string]: boolean; };

class App {
	private game: Game;

	constructor() {
		this.game = new Game();
	}

	public setup(): void {
		canvas = <HTMLCanvasElement>document.getElementById('canvas');
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;

		//this
		this.addEventLiteners();
		this.game.setup();
		this.gameLoop();
	}

	public addEventLiteners(): void {
		// document.addEventListener('mouseover', event => {});
		// document.addEventListener('click', event => {});
		
		document.addEventListener('keydown', event => {
			this.game.onKeyTouchBegan(event.key.toLowerCase());
		});
		document.addEventListener('keyup', event => {
			this.game.onKeyTouchEnded(event.key.toLowerCase());
		});
	}

	private gameLoop(): void {
		requestAnimationFrame(this.gameLoop.bind(this));

		canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext("2d");

		this.game.update();
		this.game.render();
	}
}

window.onload = () => {
	let app = new App();
	app.setup();
}