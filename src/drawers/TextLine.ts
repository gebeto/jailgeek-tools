import { Drawable } from './interfaces';
import { TextWord } from './TextWord';

import * as OpenType from 'opentype.js';
import { getPathWithLetterSpacing } from './addons';
import { LETTER_SPACING } from './config';



export class TextLine implements Drawable {
	index: number;
	font: OpenType.Font;
	text: string;
	x: number;
	y: number;
	words: Array<TextWord>;

	constructor(font: OpenType.Font, text: string, x: number, y: number, index: number) {
		this.index = index;
		this.font = font;
		this.text = text;
		this.x = x;
		this.y = y;

		let leftOffset = 0;
		let wordY = y + this.index * 144;
		let wordX = x;
		this.words = this.text.split(" ").map((text, index) => {
			wordX += leftOffset + (index ? 30 : 0);
			leftOffset = getPathWithLetterSpacing(this.font.getPaths(text, 0, 0, 119), LETTER_SPACING).getBoundingBox().x2!;
			return new TextWord(font, text, wordX, wordY)
		});
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.words.forEach(el => {
			el.draw(ctx);
		});
	}
}