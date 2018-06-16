import { ImageLoader } from './ImageLoader';
import { FontLoader, drawLettersWithSpacing, getPathWithLetterSpacing } from './FontLoader';

import backgroundImage from './assets/post-bg.png';
import testImage from './assets/test.png';

import fontSFDisplay from './assets/SFUIDisplayBlack.otf';
import fontArchive from './assets/Archive.otf';

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

	function drawText(text: string, x: number, y: number, fontSize: number) {
		text.split("\n").forEach((t, index) => {
			let lineSpacing = fontSize + fontSize / 4.4 * index;
			const line1 = getPathWithLetterSpacing(SFDisplay.getPaths(t, 100, 244 + (index ? lineSpacing : 0), fontSize), letterSpacing);
			line1.fill = "#3C4D60";
			line1.draw(ctx);
		});
	}

	drawText("Мы поможем вам\nсохранить shsh", 100, 244, 119);

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
