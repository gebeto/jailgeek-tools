import html2canvas from 'html2canvas';
import { Offsetable } from './Offsetable';


export interface CreatePostGeneratorProps {
	postFontPath: string,
	hashFontPath: string,
	backgroundImagePath: string,

	// resultImageWrapper: HTMLElement;
	resultImage: HTMLImageElement;

	postInput: HTMLInputElement | HTMLTextAreaElement;
	hashInput: HTMLInputElement | HTMLTextAreaElement;
	generateButton: HTMLButtonElement;

	updateOffset?: number;
}


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

export function injectStyles() {
	const styles = document.createElement("style");
	styles.innerHTML = `
		.post__content-wrapper {
			opacity: 0;
			width: 0px;
			height: 0px;
			overflow: hidden;
		}

		.post__content {
			background: red;
			width: 1500px;
			height: 1000px;
			position: relative;
		}

		.post__text {
			position: absolute;
			font-family: 'SF Display';
			width: 100%;
			height: 100%;
			left: 0px;
			top: 0px;
			padding: 130px 100px;
			font-size: 119px;
			letter-spacing: 0.6px;
			color: #3C4D60;
			line-height: 146px;
		}

		.post__tag {
			position: absolute;
			font-family: Archive;
			left: 100px;
			bottom: 110px;
			font-size: 100px;
			color: #3C4D60;
		}

		.post__text .blue {
			font-size: 119px;
			letter-spacing: 0.6px;
			color: #3880D3;
			line-height: 146px;
		}
	`;
	document.head.appendChild(styles);
}


export function CreatePostGenerator(props: CreatePostGeneratorProps) {
	function generateText(text: string) {
		let result = text.replace(/\*(.+?)\*/gi, '<span class="blue">$1</span>').replace("\n", "<br />")
		return result;
	}


	injectFonts([{
		family: "SF Display",
		url: props.postFontPath,
	}, {
		family: "Archive",
		url: props.hashFontPath,
	}]);


	// WRAPPER
	const contentWrapper = document.createElement("div")!;
	contentWrapper.className = "post__content-wrapper";
	document.body.appendChild(contentWrapper);

	const content = document.createElement("div")
	content.className = "post__content";

	// BG
	const img = document.createElement("img");
	img.src = props.backgroundImagePath;
	// img.src = testImage;

	const tag = document.createElement("span");
	tag.className = "post__tag";
	tag.textContent = "#";

	const text = document.createElement("span");
	text.className = "post__text";
	text.innerHTML = "";

	content.appendChild(img);
	content.appendChild(tag);
	content.appendChild(text);
	contentWrapper.appendChild(content);

	injectStyles();


	// const resultWrapper = props.resultImageWrapper;
	const offsetableUpdateCanvas = new Offsetable(props.updateOffset || 1000, function() {
		const converter = html2canvas(content);
		converter.then(function(canvas) {
			props.resultImage.src = canvas.toDataURL();
			// resultWrapper.innerHTML = "";
			// const image = document.createElement('img');
			// image.src = canvas.toDataURL();
			// resultWrapper.appendChild(image);
		});
	});

	const textInput = props.postInput;
	const tagInput = props.hashInput;
	const generateInput = props.generateButton;

	function getInputType(element: HTMLElement) {
		let result = "input"
		if (["select"].indexOf(element.tagName) > -1) {
			result = "change";
		}
		return result;
	}

	textInput.addEventListener(getInputType(textInput), function(e) {
		text.innerHTML = generateText(textInput.value);
		offsetableUpdateCanvas.withOffset();
	});

	tagInput.addEventListener(getInputType(tagInput), function(e) {
		tag.innerHTML = "#" + generateText(tagInput.value);
		offsetableUpdateCanvas.withOffset();
	});

	generateInput.addEventListener("click", function () {
		offsetableUpdateCanvas.withoutOffset();
	});


	offsetableUpdateCanvas.withoutOffset();
}

(window as any).CreatePostGenerator = CreatePostGenerator;