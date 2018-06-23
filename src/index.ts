import backgroundImage from './assets/post-bg.png';
import testImage from './assets/test.png';

import fontSFDisplay from './assets/SFUIDisplayBlack.otf';
import fontArchive from './assets/Archive.otf';

import { CreatePostGenerator } from './PostGenerator';


CreatePostGenerator({
	postFontPath: fontSFDisplay,
	hashFontPath: fontArchive,
	backgroundImagePath: backgroundImage,

	// resultImageWrapper: document.getElementById("post-wrapper") as HTMLElement,
	resultImage: document.getElementById("result-image") as HTMLImageElement,

	postInput: document.querySelector("textarea") as HTMLTextAreaElement,
	hashInput: document.querySelector("input") as HTMLInputElement,
	generateButton: document.querySelector("button") as HTMLButtonElement,

	updateOffset: 1000,
});
	// document.querySelector("textarea")!;
	// document.querySelector("input")!;
	// document.querySelector("button")!;