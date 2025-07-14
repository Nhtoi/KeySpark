import Builder from "../services/Builder.js";

export class ProgressPage extends HTMLElement {
  constructor() {
    super();
    const element = this;
    const cssPath = "../styles/ProgressPage.css";
    const template = "progress-template";
    const builder = new Builder(element, cssPath, template);
    builder.build().then((root) => {
      this.root = root;
    });
  }
}
customElements.define("progress-page", ProgressPage);
