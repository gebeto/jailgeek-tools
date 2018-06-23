import html2canvas from 'html2canvas';
import { injectStyles } from '../Injectors';
import styles from './styles.css';
import { loadImage, loadImageFromFile, checkOrientation, Orientation, scaleToFit } from './utils';


export interface CreateWallpapersGeneratorProps {
	fileInput: HTMLInputElement;
	resultImage: HTMLImageElement;

	w1: string;
	w2: string;
	w3: string;
	w4: string;
	w5: string;
}

export function createImgWrapper(img: HTMLImageElement, orientation: Orientation, opts?: any) {
	img.className = orientation;
	const imgWrapper = document.createElement("div");
	imgWrapper.className = "wallpapers__img-wrapper";
	imgWrapper.appendChild(img);
	if (opts) {
		imgWrapper.style.width = `${opts.width}px`;
		imgWrapper.style.height = `${opts.height}px`;
		imgWrapper.style.left = `${opts.left}px`;
		imgWrapper.style.top = `${opts.top}px`;
		if (orientation === Orientation.Portrait) {
			const divider = img.height / opts.height;
			let width = Math.round(img.width / divider);
			const c = -((width - opts.width) / 2);
			img.style.left = `${c}px`;
		} else if (orientation === Orientation.Landscape) {
			// const divider = img.width / opts.width;
			// let height = Math.round(img.height / divider);
			// const c = -((height - opts.height) / 2);
			// img.style.top = `${c}px`;
		}
	}
	return imgWrapper;
}

export function generateWallpapers_1(wrapper: HTMLElement, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_1");

	const img1 = createImgWrapper(imgs[0], Orientation.Landscape, {
		width: 2050,
		height: 1150,
		left: 160,
	    top: 447,
	});
	wrapper.appendChild(img1);
}

export function generateWallpapers_2(wrapper: HTMLElement, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_2");
	const img1 = createImgWrapper(imgs[0], Orientation.Landscape, {
		width: 2050,
		height: 954,
		left: 160,
		top: 645,
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
}

export function generateWallpapers_5(wrapper: HTMLElement, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_5");
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

	props.fileInput.addEventListener("change", (e: any) => {
		const tgt = e.target;
		const files = e.target.files;
		const count = files.length;
		if (count > 5 || count < 1) {
			return;
		}

		const background = loadImage([
			props.w1,
			props.w2,
			props.w3,
			props.w4,
			props.w5,
		][count - 1]);

		const images = Promise.all<HTMLImageElement>(Array.prototype.map.call(files, (f: any) => loadImageFromFile(f)));

		draw(wrapper, background, images).then((wrapper) => {
			return html2canvas(wrapper, {
				// width: 2400,
				// height: 1600,
				scale: 1,
			});
		})
		.then(function(canvas) {
			props.resultImage.src = (canvas as HTMLCanvasElement).toDataURL();
		});
	});
}


console.log(CreateWallpapersGenerator);

(window as any).CreateWallpapersGenerator = CreateWallpapersGenerator;