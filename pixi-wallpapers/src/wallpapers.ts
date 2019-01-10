import * as PIXI from 'pixi.js';
import MultiStyleText from 'pixi-multistyle-text';

import w_1 from './assets/images/w_1.png';
import w_2 from './assets/images/w_2.png';
import w_3 from './assets/images/w_3.png';
import w_4 from './assets/images/w_4.png';
import w_5 from './assets/images/w_5.png';

const w = [w_1, w_2, w_3, w_4, w_5];

const w1_Input = document.getElementById('w1_input');
const w2_Input = document.getElementById('w2_input');
const w3_Input = document.getElementById('w3_input');
const w4_Input = document.getElementById('w4_input');
const w5_Input = document.getElementById('w5_input');


function loadImageFromFile(file: any) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		if (FileReader) {
			const fr = new FileReader();
			fr.onload = function () {
				var someImage = new Image();
				someImage.src = 'someSource.png';
				someImage.onload = () => resolve(
					new PIXI.Texture(new PIXI.BaseTexture(someImage))
				);
				// const img = document.createElement("img");
				// img.src = fr.result as string;
				// resolve(img);
			}
			fr.readAsDataURL(file);
		} else {
			reject("Cant load this shit!");
		}
	});
}

function loadImage(path: any) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const result = document.createElement("img");
		result.onload = function () {
			resolve(result);
		}
		result.onerror = reject;
		result.src = path;
	});
}


function imageToTexture() {
	return new Promise((resolve, reject) => {
		var someImage = new Image()
		someImage.src = 'someSource.png'
		someImage.onload = function(){
			resolve(
				new PIXI.Texture(new PIXI.BaseTexture(someImage))
			);
		}
	});
}

const onFileInputChange = (e: any) => {
	console.log("Hey!!!", e);
	const files = [
		w1_Input,
		w2_Input,
		w3_Input,
		w4_Input,
		w5_Input,
	].map((inp: any) => inp.files).filter((fls: any) => fls.length > 0).map(fls => fls![0]);
	
	const count = files.length;
	if (count > 5 || count < 1) {
		return;
	}
	console.log('count', count);

	const background: any = loadImage(w[count - 1]);
	const images = Promise.all<HTMLImageElement>(Array.prototype.map.call(files, (f: any) => loadImageFromFile(f)));
	images.then(el => {
		console.log(el);
	})
}



export default function init() {
	var app = new PIXI.Application(2400, 1600, {
		backgroundColor : 0xf4f4f4,
		view: document.getElementById('canvas') as HTMLCanvasElement,

	});
	(window as any).app = app;
	// document.body.appendChild(app.view);
	var bg = PIXI.Sprite.fromImage(w[0]);

	const image = PIXI.Sprite.fromImage(w[0]);

	const tagSize = 114;
	const postTag = new PIXI.Text('TAG NAME', {
		fontSize: tagSize,
		fontFamily: 'SF Display Heavy',
	});
	postTag.x = 370;
	postTag.y = 1216 + ((160 - 114) / 2);

	app.stage.addChild(bg);
	app.stage.addChild(image);
	app.stage.addChild(postTag);
}



w1_Input.addEventListener('change', onFileInputChange);
w2_Input.addEventListener('change', onFileInputChange);
w3_Input.addEventListener('change', onFileInputChange);
w4_Input.addEventListener('change', onFileInputChange);
w5_Input.addEventListener('change', onFileInputChange);