export abstract class AbstractGenerator {
	_element?: HTMLElement;

	constructor() {
		
	}

	_render() {
		`
		<div class="container-fluid" data-tab="post">
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label>Текст</label>
						<textarea row="3" placeholder="Текст" class="form-control"></textarea>
						<div class="col-sm-12 text-muted">
							<ul>
								<li>*Слово* что б выделить текст синим цветом</li>
							</ul>
						</div>
					</div>
					<div class="form-group">
						<label>Тег</label>
						<input placeholder="Тег" class="form-control" />
					</div>
					<div class="form-group">
						<button class="btn btn-primary">Generate</button>
					</div>
					<div class="content-wrapper"></div>
				</div>
				<div id="post-wrapper" class="col-sm-6">
					
				</div>
			</div>
		</div>
		`
		const wrapper = document.createElement("div");
		wrapper.className = "container-fluid";

		const row = document.createElement("div");
		row.className = "row";

		const controlsWrapper = document.createElement("div");
		controlsWrapper.className = "col-sm-6";

		const convertContentWrapper = document.createElement("div");
		convertContentWrapper.className = "content-wrapper";
		convertContentWrapper.style.width = "0px";
		convertContentWrapper.style.height = "0px";
		convertContentWrapper.style.overflow = "hidden";

		const imageWrapper = document.createElement("div");
		imageWrapper.className = "col-sm-6";

		wrapper.appendChild(row);
		row.appendChild(controlsWrapper);
		controlsWrapper.appendChild(convertContentWrapper);
		row.appendChild(imageWrapper);

		this._element = wrapper;

	}

	get element() {
		if (!this._element) {
			this._render();
		}
		return this._element;
	}

}