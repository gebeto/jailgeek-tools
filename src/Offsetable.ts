export class Offsetable {
	offset: number;
	callback: any;

	timeoutId?: number;

	constructor(offset: number, callback: any) {
		this.offset = offset;
		this.callback = callback;
	}

	withOffset() {
		clearTimeout(this.timeoutId);
		this.timeoutId = setTimeout(() => {
			this.callback();
		}, this.offset);
	}

	withoutOffset() {
		clearTimeout(this.timeoutId);
		this.callback();
	}
}