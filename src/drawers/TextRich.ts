import { Drawable } from './interfaces';
import { TextLine } from './TextLine';
import { getPathWithLetterSpacing } from './addons';

import * as OpenType from 'opentype.js';


export class TextRich implements Drawable {
	font: OpenType.Font;
	text: string;
	x: number;
	y: number;
	lines: Array<TextLine>;

	constructor(font: OpenType.Font, text: string, x: number, y: number) {
		this.font = font;
		this.text = text;
		this.x = x;
		this.y = y;
		this.lines = this.text.split("\n").map((text, index) => new TextLine(font, text, x, y, index));
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.lines.forEach(el => {
			el.draw(ctx);
		});
	}
}
