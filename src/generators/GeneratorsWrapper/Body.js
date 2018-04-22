

export default class GeneratorsWrapperBody {
	constructor() {
		this.bodyWrapper = document.createElement('div');
		this.bodyWrapper.className = 'card-body text-left';

		this.bodyWrapper.innerHTML = `
			<div class="col-md-12">
			</div>`;

		this.wrapper = document.createElement('div');
		this.wrapper.className = 'col-md-12';
		this.bodyWrapper.appendChild(this.wrapper);

		this.generator = null;
	}

	set(generator) {
		if (this.generator) {
			this.wrapper.removeChild(this.generator.wrapper);
			this.generator = null;
		}

		const renderedGenerator = generator.render();
		this.wrapper.appendChild(renderedGenerator);
		this.generator = generator;
	}

	render() {
		return this.bodyWrapper;
	}
}