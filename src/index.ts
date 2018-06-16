import * as PIXI from 'pixi.js';

import backgroundImage from './assets/post-bg.png';
import font from './assets/SFUIDisplayBlack.otf';

import * as O from 'opentype.js';

// const app = new PIXI.Application({
// 	view: <HTMLCanvasElement>document.getElementById("test-canvas"),
// });


// // create a new Sprite from an image path
// const background = PIXI.Sprite.fromImage(backgroundImage);
// background.width = app.renderer.width;
// background.height = app.renderer.height;
// app.stage.addChild(background);

O.load(font, (e, font) => {
	const canvas = <HTMLCanvasElement>document.getElementById("test-canvas");
	const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
	console.log(font);
	if (font) {
		font.draw(ctx, "Hello", 0, 30, 30)
	}

	// const t = new PIXI.Text("Hello world!", {
	// 	fontFamily: "SF UI Display",
	// });
	// app.stage.addChild(t);
});

// const text = new PIXI.Text("Hello world!", {
// 	fontFamily: "Archive",
// 	fontSize: 40,
// });
// app.stage.addChild(text);

// Listen for animate update
// app.ticker.add(function(delta) {
//		 background.rotation += 0.1 * delta;
// });