import { ImageLoader } from './ImageLoader';
import { FontLoader } from './FontLoader';

import * as OpenType from 'opentype.js';

import backgroundImage from './assets/post-bg.png';
import testImage from './assets/test.png';

import fontSFDisplay from './assets/SFUIDisplayBlack.otf';
import fontArchive from './assets/Archive.otf';

import { RichText } from './drawers/';

const bg = ImageLoader(backgroundImage);
const test = ImageLoader(testImage);
const SFDisplay = FontLoader(fontSFDisplay);
const Archive = FontLoader(fontArchive);

// ImageLoader(testImage).then((image) => {
// 	(document.querySelector("#post-wrapper") as HTMLElement).appendChild(image);
// });


Promise.all([
	// bg,
	test,
	SFDisplay,
	Archive,
]).then(([bg, SFDisplay, Archive]) => {
	const canvas = <HTMLCanvasElement>document.getElementById("test-canvas");
	const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

	ctx.drawImage(bg, 0, 0);

	const letterSpacing = 0.6;

	// function drawText(text: string, x: number, y: number, fontSize: number) {
	// 	text.split("\n").forEach((line, lineIndex) => {
	// 		let lineSpacing = (fontSize * lineIndex) + fontSize / 4.4 * lineIndex;
	// 		let prevWord: OpenType.BoundingBox;
	// 		line.split(" ").map((word, wordIndex, arr) => {
	// 			console.log(arr)
	// 			let index = lineIndex * wordIndex;

	// 			let fill = "#3C4D60";
	// 			function drawWord(word: string, wordIndex: number) {
	// 				if (word.match(/\*\w+\*/)) {
	// 					word = word.replace(/\*(\w+)\*/, "$1");
	// 					fill = "#3880D3";
	// 				} else {
	// 					fill = "#3C4D60";
	// 				}
	// 				let x = 0;

	// 				if (prevWord) {
	// 					x = prevWord.x2! - 72;
	// 				}
	// 				const t = getPathWithLetterSpacing(SFDisplay.getPaths(word, 100 + x - (word.match(/\./) ? 26 : 0), 244 + (lineIndex ? lineSpacing : 0), fontSize), letterSpacing);
	// 				prevWord = t.getBoundingBox();
	// 				t.fill = fill;
	// 				t.draw(ctx);
	// 			}
	// 			if (word.match(/\*\w+\*/)) {
	// 				word = word.replace(/\*(\w+)\*/, "*$1* ");
	// 				word.split(" ").forEach((chunk, index) => {
	// 					drawWord(chunk, wordIndex + index);
	// 				})
	// 			} else {
	// 				drawWord(word, wordIndex);
	// 			}

	// 		});
	// 	});
	// }

	interface Drawable {
		draw(ctx: CanvasRenderingContext2D): void;
	}


	function drawText(text: string, x: number, y: number, fontSize: number) {
		const rich = new RichText(SFDisplay, text, x, y);
		console.log(rich);
		rich.draw(ctx);
	}

	drawText("Мы поможем вам\nсохранить *shsh*. and", 100, 244, 119);
	// drawText("a", 100, 244, 119);

	// const line1 = getPathWithLetterSpacing(SFDisplay.getPaths("Мы поможем вам", 100, 244, 119), letterSpacing);
	// line1.fill = "#3C4D60";
	// line1.draw(ctx);
	
	// const line2 = getPathWithLetterSpacing(SFDisplay.getPaths("сохранить shsh", 100, 390, 119), letterSpacing);
	// line2.fill = "#3C4D60";
	// line2.draw(ctx);

	// const line3 = getPathWithLetterSpacing(SFDisplay.getPaths("сохранить shsh", 100, 390, 119), letterSpacing);
	// line3.fill = "#3880D3";
	// line3.draw(ctx);

	// console.log(line1)

});
