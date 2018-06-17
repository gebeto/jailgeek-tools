import { Drawable } from './interfaces';
import { Word as TextWord } from './Word';

import * as OpenType from 'opentype.js';
import { getPathWithLetterSpacing } from './addons';
import { LETTER_SPACING } from './config';



export class Line implements Drawable {
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

		let wordY = y + this.index * 144;
		let wordX = x;
		this.words = this.text.split(" ").map((text, index) => {
			wordX += leftOffset + (index ? 30 : 0);
			const result = new TextWord(font, text, wordX, wordY);
			leftOffset = result.width;
			return ;
		});
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.words.forEach(el => {
			el.draw(ctx);
		});
	}
}