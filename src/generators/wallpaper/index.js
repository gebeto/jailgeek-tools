import Generator from '../Generator';



export default class WallpaperGenerator extends Generator {
	constructor() {
		super();
		this.title = 'Wallpapers';
		this.fields = [{
			label: 'Wallpapers',
			type: 'file',
			attributes: [
				['multiple', '1'],
			]
		}];
	}
}