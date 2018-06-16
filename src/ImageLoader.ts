export function ImageLoader(imageUrl: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = function() {
			resolve(image);
		};
		image.src = imageUrl;
	});
}