import HTML2Canvas from 'html2canvas';

import backgroundImage from './assets/post-bg.png';
import testImage from './assets/test.png';

import fontSFDisplay from './assets/SFUIDisplayBlack.otf';
import fontArchive from './assets/Archive.otf';


const fonts = document.createElement("style");
fonts.innerHTML = `
	@font-face {
		font-family: Archive;
		src: url(${fontArchive});
	}
	@font-face {
		font-family: SF Display;
		src: url(${fontSFDisplay});
	}
`;
document.head.appendChild(fonts);



// Мы поможем вам\nсохранить *shsh*.

// WRAPPER
const content = document.createElement("div")
content.className = "content";

// BG
const img = document.createElement("img");
img.src = backgroundImage;
// img.src = testImage;

const tag = document.createElement("span");
tag.className = "tag";
tag.textContent = "#";

const text = document.createElement("span");
text.className = "text";
text.innerHTML = "";

content.appendChild(img);
content.appendChild(tag);
content.appendChild(text);


function generateText(text: string) {
	// let result = text.replace(/\*([\sa-zA-Zа-яА-Яіїё]+?)\*/gi, '<span class="blue">$1</span>')
	let result = text.replace(/\*(.+?)\*/gi, '<span class="blue">$1</span>')
	return result;
}


(document.querySelector(".content-wrapper") as HTMLElement).appendChild(content);

function updateCanvas() {
	HTML2Canvas(content).then(function(canvas) {
		wrapper.innerHTML = "";
		const image = document.createElement('img');
		image.src = canvas.toDataURL();
		wrapper.appendChild(image);
	});
}

let canUpdate = true;
const wrapper = (document.querySelector("#post-wrapper") as HTMLElement);
const textInput = document.querySelector("textarea")!;
const tagInput = document.querySelector("input")!;
textInput.addEventListener("input", function(e) {
	text.innerHTML = generateText(textInput.value);
	updateCanvas();
});

tagInput.addEventListener("input", function(e) {
	tag.innerHTML = "#" + generateText(tagInput.value);
	updateCanvas();
});

updateCanvas();