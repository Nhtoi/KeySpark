import Builder from "../services/Builder.js";
import { getExerciseById } from "../services/API.js";
export class ProgressPage extends HTMLElement {
  constructor() {
    super();
    const element = this;
    const cssPath = "../styles/ProgressPage.css";
    const template = "progress-template";
    const builder = new Builder(element, cssPath, template);
    builder.build().then((root) => {
      this.root = root;
      this.onBuild();
    });
  }
  onBuild() {
    const getAllMaps = JSON.parse(
      localStorage.getItem("completed") || { completed: {} }
    );
    const difficulties = ["Beginner", "Intermediate", "Advanced"];

    difficulties.forEach((diff) => {
      const entries = Object.entries(getAllMaps.completed[diff] || {});
      entries.forEach(([id, val]) => {
        if (val == true) {
          getExerciseById(diff, id).then((ex) => {
            const container = this.root.querySelector(`#${diff}Container`);
            if (container) {
              if (!container.querySelector("h1")) {
                const h1 = document.createElement("h1");
                h1.innerText = ex.difficulty;
                container.appendChild(h1);
              }

              const h2 = document.createElement("h2");
              h2.innerText = ex.description;
              container.appendChild(h2);
            }
            this.root.append(div);
          });
        }
      });
    });
  }
}
customElements.define("progress-page", ProgressPage);
