import html2canvas from 'html2canvas';
import { injectFonts, injectStyles } from '../Injectors';
import { Offsetable } from '../Offsetable';
import styles from './styles.css';


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


export function CreatePostGenerator(props: CreatePostGeneratorProps) {
	function generateText(text: string) {
		let result = text.replace(/\*(.+?)\*/gi, '<span class="blue">$1</span>').replace(/\n/g, "<br />")
		return result;
	}


	injectFonts([{
		family: "SF Display Heavy",
		url: props.postFontPath,
	}, {
		family: "SF Display Bold",
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
	img.width = 1500;
	img.src = props.backgroundImagePath;

	const tag = document.createElement("span");
	tag.className = "post__tag";
	tag.textContent = "";

	const text = document.createElement("span");
	text.className = "post__text";
	text.innerHTML = "";

	content.appendChild(img);
	content.appendChild(tag);
	content.appendChild(text);
	contentWrapper.appendChild(content);

	injectStyles(styles);

	// const resultWrapper = props.resultImageWrapper;
	const offsetableUpdateCanvas = new Offsetable(props.updateOffset || 1000, function() {
		const converter = html2canvas(content);
		converter.then(function(canvas) {
			props.resultImage.src = canvas.toDataURL();
		});
	});

	const textInput = props.postInput;
	const tagInput = props.hashInput;
	const generateInput = props.generateButton;

	function getEventType(element: HTMLElement) {
		let result = "input"
		if (["select"].indexOf(element.tagName) > -1) {
			result = "change";
		}
		return result;
	}

	textInput.addEventListener(getEventType(textInput), function(e) {
		text.innerHTML = generateText(textInput.value);
		offsetableUpdateCanvas.withOffset();
	});

	tagInput.addEventListener(getEventType(tagInput), function(e) {
		tag.innerHTML = generateText(tagInput.value);
		offsetableUpdateCanvas.withOffset();
	});

	generateInput.addEventListener("click", function () {
		offsetableUpdateCanvas.withoutOffset();
	});


	offsetableUpdateCanvas.withoutOffset();

	return {
		setTag(hash: string) {
			tagInput.value = hash;
			tagInput.dispatchEvent(new Event(getEventType(tagInput)));
			offsetableUpdateCanvas.withoutOffset();
		},
		setText(text: string) {
			textInput.value = text;
			textInput.dispatchEvent(new Event(getEventType(tagInput)));
			offsetableUpdateCanvas.withoutOffset();
		}
	};
}

(window as any).CreatePostGenerator = CreatePostGenerator;