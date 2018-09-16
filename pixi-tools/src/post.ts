import * as PIXI from 'pixi.js';
import MultiStyleText from 'pixi-multistyle-text';

// import bgUrl from './assets/images/post-bg.png';
import bgUrl from './assets/images/test.png';



export default function init() {
	var app = new PIXI.Application(2400, 1600, {
		backgroundColor : 0xf4f4f4,
		view: document.getElementById('canvas') as HTMLCanvasElement,

	});
	(window as any).app = app;
	// document.body.appendChild(app.view);
	var bg = PIXI.Sprite.fromImage(bgUrl);
	const postText = new MultiStyleText('Продемонстриро-\nван <blue>world</blue> and all other people asdjklj aksj laskj dlaksjd kalsdj alskj dasj dlk', {
		default: {
			fontFamily: 'SF Display Heavy',
			fontSize: 196,
			wordWrapWidth: 1850,
			wordWrap: true,
			fill: 'red',
			letterSpacing: 1.4,
			// color: 'black',
		},
		blue: {
			fill: 'blue',
		}
	});
	postText.x = 160;
	postText.y = 216;

	const tagSize = 114;
	const postTag = new PIXI.Text('TAG NAME', {
		fontSize: tagSize,
		fontFamily: 'SF Display Heavy',
	});
	postTag.x = 370;
	// postTag.y = 1240;
	postTag.y = 1216 + ((160 - 114) / 2);

	app.stage.addChild(bg);
	app.stage.addChild(postText);
	app.stage.addChild(postTag);

	// Listen for animate update
	// app.ticker.add(function(delta) {
	// 	// just for fun, let's rotate mr rabbit a little
	// 	// delta is 1 if running at 100% performance
	// 	// creates frame-independent transformation
	// 	// text.rotation += 0.1 * delta;
	// });
}