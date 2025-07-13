export class Builder {
	constructor(element, cssPath, templateId) {
		this.element = element;
		this.cssPath = cssPath;
		this.templateId = templateId;
	}
	async build() {
		const shadow = this.element.attachShadow({ mode: "open" });
		const style = document.createElement("style");
		if (this.cssPath) {
			const res = await fetch(this.cssPath);
			const css = await res.text();
			style.textContent = css;
		}

		const template = document.getElementById(this.templateId);
		const content =
			template?.content?.cloneNode(true) || document.createDocumentFragment();

		shadow.appendChild(style);
		shadow.appendChild(content);

		return shadow;
	}
}

export default Builder;
