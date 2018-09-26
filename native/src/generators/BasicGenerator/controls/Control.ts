export abstract class Control {
	_element?: HTMLElement;

	label: string;
	hints: Array<string>;

	constructor(label: string, hints: Array<string>) {
		this.label = label;
		this.hints = hints;
	}

	get element() {
		if (!this._element) {
			this._element = this._render();
		}
		return this._element;
	}

	_render(): HTMLElement {
		const element = document.createElement("div");
		element.className = "form-group";

		const label = document.createElement("label");
		label.innerHTML = this.label;

		element.appendChild(label);
		element.appendChild(this.inputElement());

		if (this.hints.length) {
			const hints = document.createElement("ul");
			hints.className = "col-sm-12 text-muted";
			this.hints.forEach(hint => {
				const hintElement = document.createElement("li");
				hintElement.textContent = hint;
				hints.appendChild(hintElement);
			});
			element.appendChild(hints);
		}

		return element;
	}

	abstract inputElement(): HTMLElement;
}