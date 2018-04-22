import GeneratorsWrapperHeaderItem from './HeaderItem';


export default class GeneratorsWrapperHeader {
	constructor() {
		this.wrapper = document.createElement('div');
		this.wrapper.className = 'card-header';

		this.elementsList = document.createElement('ul');
		this.elementsList.className = 'nav nav-tabs card-header-tabs';
		this.wrapper.appendChild(this.elementsList);

		this.generators = [];
	}

	add(linkName) {
		const linkItem = new GeneratorsWrapperHeaderItem(linkName, this);
		this.generators.push(linkItem);
		this.elementsList.appendChild(linkItem.render());
	}

	_onChange(linkName) {
		this.generators.map(g => {
			g.setUnActive();
		});
		this.onChange && this.onChange(linkName);
	}

	render() {
		return this.wrapper;
	}
}