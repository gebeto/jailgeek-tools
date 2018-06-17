import { Control } from './Control';


export class Control_textarea extends Control {
	constructor(label: string, hints: Array<string>) {
		super(label, hints);
	}

	inputElement() {
		const element = document.createElement("textarea");
		element.placeholder = "Текст";
		element.className = "form-control";
		element.rows = 3;
		return element;
	}
}