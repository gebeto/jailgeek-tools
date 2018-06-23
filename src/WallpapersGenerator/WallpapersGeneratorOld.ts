import html2canvas from 'html2canvas';
import { injectStyles } from '../Injectors';
import styles from './styles.css';
import { loadImage, loadImageFromFile, checkOrientation, scaleToFit, Box } from './utils';


export interface CreateWallpapersGeneratorProps {
	fileInput: HTMLInputElement;

	w1: string;
	w2: string;
	w3: string;
	w4: string;
	w5: string;
}

export function drawCenteredImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, box: Box, x: number, y: number) {
	ctx.drawImage(img, x - box.width / 2, y - box.height / 2, box.width, box.height);

	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI * 2);
	ctx.fill()
}

export function generateWallpapers_1(ctx: CanvasRenderingContext2D, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_1");
	const img = imgs[0];
	const box = scaleToFit(img, 2050, 1150);
	drawCenteredImage(ctx, img, box, 1185, 1025);
}

export function generateWallpapers_2(ctx: CanvasRenderingContext2D, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_2");
	
	const img1 = imgs[0];
	const box1 = scaleToFit(img1, 2050, 1150);
	drawCenteredImage(ctx, img1, box1, 1185, 1125);

	const img2 = imgs[1];
	const box2 = scaleToFit(img2, 816, 1555);
	drawCenteredImage(ctx, img2, box2, 1648, 1025);
}

export function generateWallpapers_3(ctx: CanvasRenderingContext2D, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_3");
}

export function generateWallpapers_4(ctx: CanvasRenderingContext2D, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_4");
}

export function generateWallpapers_5(ctx: CanvasRenderingContext2D, imgs: Array<HTMLImageElement>) {
	console.log("generateWallpapers_5");
}


export function draw(background: Promise<HTMLImageElement>, images: Promise<HTMLImageElement[]>) {
	const canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
	const ctx = canvas.getContext("2d")!;

	// images.then((imgs: any) => {
	// 	[
	// 		generateWallpapers_1,
	// 		generateWallpapers_2,
	// 		generateWallpapers_3,
	// 		generateWallpapers_4,
	// 		generateWallpapers_5,
	// 	][imgs.length - 1](ctx, imgs);
	// }).then(() => {
	// 	background.then(bg => {
	// 		ctx.drawImage(bg, 0, 0);
	// 		// ctx.fillRect(160, 450, 2080, 1250);
	// 	});
	// });

	background.then(bg => {
		setTimeout(() => {
			ctx.drawImage(bg, 0, 0, ctx.canvas.width, ctx.canvas.height);
		}, 1000);
		images.then((imgs: any) => {
			[
				generateWallpapers_1,
				generateWallpapers_2,
				generateWallpapers_3,
				generateWallpapers_4,
				generateWallpapers_5,
			][imgs.length - 1](ctx, imgs);
		});
	});
}


export function CreateWallpapersGenerator(props: CreateWallpapersGeneratorProps) {

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

		draw(background, images);
	});

	injectStyles(styles);
}


console.log(CreateWallpapersGenerator);

(window as any).CreateWallpapersGenerator = CreateWallpapersGenerator;