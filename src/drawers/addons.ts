import * as OpenType from 'opentype.js';



export function getPathWithLetterSpacing(paths: OpenType.Path[], letterSpacing: number) {
	let result = new OpenType.Path();
	paths.forEach((path, index) => {
		path.commands.forEach((el) => {
			if (el.x) {
				el.x += letterSpacing * index;
			}
			if (el.x1) {
				el.x1 += letterSpacing * index;
			}
			if (el.x2) {
				el.x2 += letterSpacing * index;
			}
			result.commands.push(el);
		});
	})
	return result;
}