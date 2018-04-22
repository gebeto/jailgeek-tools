export default class GeneratorsWrapperHeaderItem {
	constructor(linkName, header) {
		this.title = linkName;
		this.header = header;

		this.isActive = false;

		this.link = document.createElement('a');
		this.link.className = 'nav-link' + (this.isActive ? ' active' : '');
		this.link.textContent = linkName;

		this.linkWrapper = document.createElement('li');
		this.linkWrapper.className = 'nav-item';
		this.linkWrapper.appendChild(this.link);

		this.linkWrapper.addEventListener('click', () => {
			this.setActive();
		});
	}

	setActive() {
		this.header._onChange && this.header._onChange(this.title);
		this.link.className = 'nav-link active';
		this.isActive = true;
	}

	setUnActive() {
		this.link.className = 'nav-link';
		this.isActive = false;
	}

	render() {
		return this.linkWrapper;
	}
}
