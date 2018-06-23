
export function loadImageFromFile(file: any) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		if (FileReader) {
			const fr = new FileReader();
			fr.onload = function () {
				const img = document.createElement("img");
				img.src = fr.result;
				resolve(img);
			}
			fr.readAsDataURL(file);
		} else {
			reject("Cant load this shit!");
		}
	});
}
export function loadImage(path: any) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const result = document.createElement("img");
		result.onload = function () {
			resolve(result);
		}
		result.onerror = reject;
		result.src = path;
	});
}


export enum Orientation {
	Portrait = "portrait",
	Landscape = "landscape",
}

export function checkOrientation(img: HTMLImageElement): Orientation {
	if (img.width > img.height) {
		return Orientation.Landscape;
	}
	return Orientation.Portrait;
}


export interface Box {
	width: number;
	height: number;
	x: number;
	y: number;
}

export function scaleToFit(img: HTMLImageElement, towidth: number, toheight: number): Box {
	// let width = towidth;
	// let height = toheight;
	const divider = img.width / towidth;
	let width = img.width / divider;
	let height = img.height / divider;

	// if (width < towidth) {
	// 	const divider = img.width / towidth;
	// 	width = width / divider;
	// 	height = height / divider;
	// }
	// if (height < toheight) {
	// 	const divider = img.height / towidth;
	// 	width = width / divider;
	// 	height = height / divider;
	// }

	const y = 0;
	const x = 0;
	
	return {
		width: width,
		height: height,
		x: x,
		y: y,
	}
}