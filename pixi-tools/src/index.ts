import WebFont from 'webfontloader';
import * as PIXI from 'pixi.js';


import Archive from './assets/fonts/Archive.otf';
console.log(Archive)


WebFont.load({
	active: function() {
		console.log('Fonts loaded')
		init();
	},
	fontactive: function(familyName, fvd) {
		console.log(familyName, fvd)
	},
	custom: {
		families: ['Archive'],
		urls: ['fonts/fonts.css'],
	}
});

var text;

function init() {
	var app = new PIXI.Application(2400, 1600, {
		backgroundColor : 0x1099bb,
		view: document.getElementById('canvas') as HTMLCanvasElement,

	});
	(window as any).app = app;
	// document.body.appendChild(app.view);

	text = new PIXI.Text('Hello world and all other people asdjklj aksj laskj dlaksjd kalsdj alskj dasj dlk', {
		fontFamily: 'Archive',
		fontSize: 100,
		wordWrapWidth: 1000,
		wordWrap: true,
	})

	text.anchor.set(0.5);

	// move the sprite to the center of the screen
	text.x = app.screen.width / 2;
	text.y = app.screen.height / 2;

	app.stage.addChild(text);

	// Listen for animate update
	app.ticker.add(function(delta) {
		// just for fun, let's rotate mr rabbit a little
		// delta is 1 if running at 100% performance
		// creates frame-independent transformation
		// text.rotation += 0.1 * delta;
	});
}