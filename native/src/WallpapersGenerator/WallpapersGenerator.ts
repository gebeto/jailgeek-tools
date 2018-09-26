import html2canvas from 'html2canvas';
import { injectStyles } from '../Injectors';
import styles from './styles.css';
import { loadImage, loadImageFromFile, checkOrientation, Orientation, scaleToFit } from './utils';


export interface CreateWallpapersGeneratorProps {
	w1_Input: HTMLInputElement;
	w2_Input: HTMLInputElement;
	w3_Input: HTMLInputElement;
	w4_Input: HTMLInputElement;
	w5_Input: HTMLInputElement;

	w1: string;
	w2: string;
	w3: string;
	w4: string;
	w5: string;

	resultImage: HTMLImageElement;
}

export function createImgWrapper(img: HTMLImageElement, orientation: Orientation, opts?: any) {
	if (img.width / 2 > img.height) {
		orientation = Orientation.Portrait;
	}

	img.className = orientation;

	const imgWrapper = document.createElement("div");
	imgWrapper.className = "wallpapers__img-wrapper";
	imgWrapper.appendChild(img);
	if (opts) {
		imgWrapper.style.width = `${opts.width}px`;
		imgWrapper.style.height = `${opts.height}px`;
		if (opts.left) {
			imgWrapper.style.left = `${opts.left}px`;
		} else if (opts.right) {
			imgWrapper.style.right = `${opts.right}px`;
		}
		imgWrapper.style.top = `${opts.top}px`;
		if (orientation === Orientation.Portrait) {
			const divider = img.height / opts.height;
			let width = Math.round(img.width / divider);
			const c = -((width - opts.width) / 2);
			img.style.left = `${c}px`;
		} else if (orientation === Orientation.Landscape) {
			const divider = img.width / opts.width;
			let height = Math.round(img.height / divider);
			const c = -((height - opts.height) / 2);
			img.style.top = `${c}px`;
		}
	}
	// console.log();
	return imgWrapper;
}

export function generateWallpapers_1(wrapper: HTMLElement, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_1");

	const img1 = createImgWrapper(imgs[0], Orientation.Landscape, {
		width: 2050,
		height: 1160,
		left: 160,
	    top: 440,
	});
	wrapper.appendChild(img1);
}

export function generateWallpapers_2(wrapper: HTMLElement, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_2");
	const img1 = createImgWrapper(imgs[0], Orientation.Landscape, {
		width: 2050,
		height: 954,
		left: 160,
		top: 647,
	});
	wrapper.appendChild(img1);

	const img2 = createImgWrapper(imgs[1], Orientation.Portrait, {
		width: 818,
		height: 1450,
		left: 1238,
		top: 440,
	});
	wrapper.appendChild(img2);
}

export function generateWallpapers_3(wrapper: HTMLElement, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_3");
	const img1 = createImgWrapper(imgs[0], Orientation.Portrait, {
		width: 600,
		height: 1200,
		left: 460,
		top: 640,
	});
	wrapper.appendChild(img1);

	const img2 = createImgWrapper(imgs[1], Orientation.Portrait, {
		width: 600,
		height: 1200,
		left: 1360,
		top: 640,
	});
	wrapper.appendChild(img2);

	const img3 = createImgWrapper(imgs[2], Orientation.Portrait, {
		width: 820,
		height: 1640,
		left: 800,
		top: 440,
	});
	wrapper.appendChild(img3);
}

export function generateWallpapers_4(wrapper: HTMLElement, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_4");
	const img1 = createImgWrapper(imgs[0], Orientation.Portrait, {
		width: 818,
		height: 1640,
		left: 160,
		top: 760,
	});
	wrapper.appendChild(img1);

	const img2 = createImgWrapper(imgs[1], Orientation.Portrait, {
		width: 818,
		height: 1640,
		left: 608,
		top: 580,
	});
	wrapper.appendChild(img2);

	const img3 = createImgWrapper(imgs[2], Orientation.Portrait, {
		width: 818,
		height: 1640,
		left: 1424,
		top: 580,
	});
	wrapper.appendChild(img3);

	const img4 = createImgWrapper(imgs[3], Orientation.Portrait, {
		width: 818,
		height: 1640,
		left: 1015,
		top: 318,
	});
	wrapper.appendChild(img4);
}

export function generateWallpapers_5(wrapper: HTMLElement, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_5");
	const img1 = createImgWrapper(imgs[0], Orientation.Portrait, {
		width: 600,
		height: 1300,
		left: 295,
		top: 925,
	});
	wrapper.appendChild(img1);

	const img2 = createImgWrapper(imgs[1], Orientation.Portrait, {
		width: 600,
		height: 1300,
		left: 1515,
		top: 925,
	});
	wrapper.appendChild(img2);

	const img3 = createImgWrapper(imgs[2], Orientation.Portrait, {
		width: 818,
		height: 1640,
		left: 463,
		top: 645,
	});
	wrapper.appendChild(img3);

	const img4 = createImgWrapper(imgs[3], Orientation.Portrait, {
		width: 818,
		height: 1640,
		left: 1136,
		top: 645,
	});
	wrapper.appendChild(img4);

	const img5 = createImgWrapper(imgs[4], Orientation.Portrait, {
		width: 818,
		height: 1640,
		left: 800,
		top: 275,
	});
	wrapper.appendChild(img5);
}

export function draw(wrapper: HTMLElement, background: Promise<HTMLImageElement>, images: Promise<HTMLImageElement[]>) {
	wrapper.innerHTML = '';
	return images
		.then((imgs: any) => {
			[
				generateWallpapers_1,
				generateWallpapers_2,
				generateWallpapers_3,
				generateWallpapers_4,
				generateWallpapers_5,
			][imgs.length - 1](wrapper, imgs);
		})
		.then(() => {
			return new Promise<HTMLElement>((resolve, reject) => {
				background.then(bg => {
					wrapper.appendChild(bg);
					resolve(wrapper);
				});
			});
		});
}

export function CreateWallpapersGenerator(props: CreateWallpapersGeneratorProps) {
	const ww = document.createElement("div");
	ww.className = "ww";
	const wrapper = document.createElement("div");
	ww.appendChild(wrapper);
	wrapper.className = "wallpapers__wrapper";
	// document.body.appendChild(wrapper);
	document.body.appendChild(ww);

	injectStyles(styles);

	const onFileInputChange = (e: any) => {
		console.log("Hey!!!", e);
		// const files = e.target.files;
		const files = [
			props.w1_Input,
			props.w2_Input,
			props.w3_Input,
			props.w4_Input,
			props.w5_Input,
		].map(inp => inp.files).filter((fls: any) => fls.length > 0).map(fls => fls![0]);
		console.log("Files", files);
		const count = files.length;
		if (count > 5 || count < 1) {
			return;
		}

		const background: any = loadImage([
			props.w1,
			props.w2,
			props.w3,
			props.w4,
			props.w5,
		][count - 1]);

		const images = Promise.all<HTMLImageElement>(Array.prototype.map.call(files, (f: any) => loadImageFromFile(f)));

		draw(wrapper, background, images).then((wrapper) => {
			return html2canvas(wrapper, {
				scale: 1,
			});
		})
		.then(function(canvas) {
			props.resultImage.src = (canvas as HTMLCanvasElement).toDataURL();
		});
	}

	props.w1_Input.addEventListener("change", onFileInputChange);
	props.w2_Input.addEventListener("change", onFileInputChange);
	props.w3_Input.addEventListener("change", onFileInputChange);
	props.w4_Input.addEventListener("change", onFileInputChange);
	props.w5_Input.addEventListener("change", onFileInputChange);
}


console.log(CreateWallpapersGenerator);

(window as any).CreateWallpapersGenerator = CreateWallpapersGenerator;