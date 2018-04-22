import GeneratorsWrapperHeader from './Header';
import GeneratorsWrapperBody from './Body';

export default class GeneratorsWrapper {
	constructor(wrapper) {
		this.wrapper = wrapper;
		this.wrapper.className = 'card text-center'

		this.body = new GeneratorsWrapperBody();
		this.header = new GeneratorsWrapperHeader();
		this.header.onChange = (generatorTitle) => {
			console.log(generatorTitle);
			this.body.set(this.generators[generatorTitle]);
		};

		this.generators = {};
	}

	add(generator) {
		this.generators[generator.title] = generator;
		this.header.add(generator.title);
	}

	render() {
		this.wrapper.appendChild(this.header.render());
		this.wrapper.appendChild(this.body.render());

		return this.wrapper;
	}
}