import { Control } from './Control';


export class Control_input extends Control {
	constructor(label: string, hints: Array<string>) {
		super(label, hints);
	}

	inputElement() {
		const element = document.createElement("input");
		element.type = "Текст";
		element.className = "form-control";
		return element;
	}
}