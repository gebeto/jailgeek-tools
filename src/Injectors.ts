
export interface FontArgs {
	family: string;
	url: string;
}


export function injectFonts(fontArgs: Array<FontArgs>) {	
	const fonts = document.createElement("style");
	fonts.innerHTML = fontArgs.map(font => `
		@font-face {
			font-family: ${font.family};
			src: url(${font.url});
		}
	`).join("\n");
	document.head.appendChild(fonts);
}


export function injectStyles(css: string) {
	const styles = document.createElement("style");
	// styles.innerHTML = css.replace(/[\n ]/ig, '');
	styles.innerHTML = css;
	document.head.appendChild(styles);
}