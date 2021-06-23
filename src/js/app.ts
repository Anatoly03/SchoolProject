import Game from './game';

class App {
	private game: Game;

	constructor() {
		this.game = new Game();

		// document.addEventListener('mouseover', event => {});
		// document.addEventListener('click', event => {});
		
		document.addEventListener('keydown', event => {
			this.game.onKeyTouchBegan(event.key.toLowerCase());
		});
		document.addEventListener('keyup', event => {
			this.game.onKeyTouchEnded(event.key.toLowerCase());
		});
	}

	public setup(): void {
		// Any setup that is required that only runs once before game loads goes here
		this.game.setup();
		this.gameLoop();
	}

	private gameLoop(): void {
		requestAnimationFrame(this.gameLoop.bind(this));

		this.game.update();
		this.game.render();
	}
}

window.onload = () => {
	let app = new App();

	app.setup();
}