import { Drawable } from './interfaces';
import * as OpenType from 'opentype.js';
import { getPathWithLetterSpacing } from './addons';
import { LETTER_SPACING } from './config';


export class TextWord implements Drawable {
	font: OpenType.Font;
	text: string;
	x: number;
	y: number;
	chunks: Array<TextWord>;

	constructor(font: OpenType.Font, text: string, x: number, y: number) {
		this.font = font;
		this.text = text;
		this.x = x;
		this.y = y;

		// this.chunks = this.text.replace(/\W/, "$1 ").map()
		let leftOffset = 0;
		let wordX = x;
		let wordY = y;
		const sp = this.text.replace(/([*])/, "$1 ").split(" ");
		this.chunks = sp.length > 2 ? sp.map((text, index) => {
			wordX += leftOffset + (index ? 30 : 0);
			leftOffset = getPathWithLetterSpacing(this.font.getPaths(text, 0, 0, 119), LETTER_SPACING).getBoundingBox().x2!;
			return new TextWord(font, text, wordX, wordY)
		}) : [];
	}

	draw(ctx: CanvasRenderingContext2D) {
		const wordPath = getPathWithLetterSpacing(
			this.font.getPaths(
				this.text,
				this.x,
				this.y,
				119
			),
			LETTER_SPACING
		);

		wordPath.draw(ctx);

		const br = wordPath.getBoundingBox();
		ctx.strokeRect(br.x1!, br.y1!, br.x2! - br.x1!, br.y2! - br.y1!);
	}
}