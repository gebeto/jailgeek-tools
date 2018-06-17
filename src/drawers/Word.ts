import { Drawable } from './interfaces';
import * as OpenType from 'opentype.js';
import { getPathWithLetterSpacing } from './addons';
import { LETTER_SPACING, FONT_SIZE } from './config';


export class Word implements Drawable {
	font: OpenType.Font;
	text: string;
	x: number;
	y: number;
	chunks: Array<Word>;

	path: OpenType.Path;
	bounding: OpenType.BoundingBox;
	positionChanged: boolean;

	constructor(font: OpenType.Font, text: string, x: number, y: number) {
		this.font = font;
		this.chunks = [];
		this.text = text;
		this.x = x;
		this.y = y;

		this.positionChanged = false;
		this.path = getPathWithLetterSpacing(
			this.font.getPaths(this.text, 0, 0, FONT_SIZE,),
			LETTER_SPACING
		);
		this.bounding = this.path.getBoundingBox();
	}

	get width() {
		return this.bounding.x2! - this.bounding.x1!;
	}

	setPosition() {
		this.path.commands.forEach(el => {
			if (el.hasOwnProperty("x"))  el.x! += this.x;
			if (el.hasOwnProperty("x1")) el.x1! += this.x;
			if (el.hasOwnProperty("x2")) el.x2! += this.x;

			if (el.hasOwnProperty("y"))  el.y! += this.y;
			if (el.hasOwnProperty("y1")) el.y1! += this.y;
			if (el.hasOwnProperty("y2")) el.y2! += this.y;
		});
		this.positionChanged = true;
	}

	resetPosition() {
		if (!this.positionChanged) return;
		this.positionChanged = false;

		this.path.commands.forEach(el => {
			if (el.hasOwnProperty("x"))  el.x! -= this.x;
			if (el.hasOwnProperty("x1")) el.x1! -= this.x;
			if (el.hasOwnProperty("x2")) el.x2! -= this.x;

			if (el.hasOwnProperty("y"))  el.y! -= this.y;
			if (el.hasOwnProperty("y1")) el.y1! -= this.y;
			if (el.hasOwnProperty("y2")) el.y2! -= this.y;
		});
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.setPosition();

		this.path.draw(ctx);
		const br = this.path.getBoundingBox();
		ctx.strokeRect(br.x1!, br.y1!, br.x2! - br.x1!, br.y2! - br.y1!);

		this.resetPosition();
	}
}