import * as OpenType from 'opentype.js';


export function FontLoader(fontPath: string): Promise<OpenType.Font> {
	return new Promise((resolve, reject) => {
		OpenType.load(fontPath, (error, font) => {
			if (font) {
				resolve(font);
			} else {
				reject(error)
			}
		});
	});
}


export function drawLettersWithSpacing(ctx: CanvasRenderingContext2D, letterSpacing: number, color: string) {
	return function(letter: OpenType.Path, index: number, arr: OpenType.Path[]) {
		letter.commands.forEach(el => {
			if (el.x) {
				el.x += letterSpacing * index;
			}
			if (el.x1) {
				el.x1 += letterSpacing * index;
			}
			if (el.x2) {
				el.x2 += letterSpacing * index;
			}
		});
		letter.fill = color;
		letter.draw(ctx);
		const lb = letter.getBoundingBox();
		ctx.strokeStyle = "red";
		ctx.strokeRect(lb.x1!, lb.y1!, lb.x2! - lb.x1!, lb.y2! - lb.y1!);
	}
}