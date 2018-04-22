export default class Generator {
	constructor() {
		this.title = 'Test Title';
		this.fields = [{
			label: 'Test Label',
			type: 'text',
			attributes: [
				['data-test', 'test'],
			]
		}];
	}

	generateElementByFieldData(fieldData) {
		switch (fieldData.type) {
			case 'text':
				return this.generateInput(fieldData);
			case 'textarea':
				return this.generateInput(fieldData);
			case 'button':
				return this.generateButton(fieldData);
		}
		return document.createElement('div');
	}

	generateInput(inputData) {
		const wrapper = document.createElement('div');
		wrapper.className = 'form-group';

		const label = document.createElement('label');
		label.textContent = 'LABEL';

		const input = document.createElement('input');
		input.type = 'text';

		wrapper.appendChild(label);
		wrapper.appendChild(input);

		return wrapper;
	}

	generateButton(inputData) {
		
	}

	generateUI() {
		// this.wrapper = document.createDocumentFragment();
		this.wrapper = document.createElement('div');
		this.wrapper.className = 'row';

		const controlsWrapper = document.createElement('div')
		controlsWrapper.className = 'col-md-6';
		this.fields.map(field => {
			controlsWrapper.appendChild(this.generateElementByFieldData(field));
		});

		const canvasWrapper = document.createElement('div');
		canvasWrapper.className = 'col-md-6';
		const canvas = document.createElement('canvas');
		canvasWrapper.appendChild(canvas);

		// const html = `
		// 	<div class="col-md-6">
		// 		<div class="form-group">
		// 			<label for="">Title</label>
		// 			<input type="text" class="form-control">
		// 		</div>
		// 		<div class="form-group">
		// 			<label for="">Secondary title</label>
		// 			<input type="text" class="form-control">
		// 		</div>
		// 		<button class="btn btn-primary">Donwload</button>
		// 	</div>
		// 	<div class="col-md-6">
		// 		<canvas style="border: 1px solid red; width: 100%; height: 100%;"></canvas>
		// 	</div>`;

		this.wrapper.appendChild(controlsWrapper);
		this.wrapper.appendChild(canvasWrapper);
	}

	render() {
		if (!this.wrapper) {
			this.generateUI();
		}
		return this.wrapper;
	}
}