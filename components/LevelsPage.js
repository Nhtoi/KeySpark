import Builder from "../services/Builder.js";

export class LevelsPage extends HTMLElement {
	constructor() {
		super();
		const element = this;
		const cssPath = "../styles/LevelsPage.css";
		const templateId = "levels-template";
		const builder = new Builder(element, cssPath, templateId);
		builder.build().then((root) => {
			this.root = root;
		});
	}
}

customElements.define("levels-page", LevelsPage);
