import Builder from "../services/Builder.js";
import { Levels } from "../services/Levels.js";

export class TrainerPage extends HTMLElement {
  constructor() {
    super();
    const cssPath = "../styles/LevelsPage.css";
    const elementId = "trainer-template";
    const root = this;
    const builder = new Builder(root, cssPath, elementId);
    builder.build().then((root) => {
      this.root = root;
      this.onBuild();
    });
  }
  onBuild() {
    if (this.dataset.id) {
      const desc = this.root.querySelector("h2");
      this.level = window.currentLevel;
      //console.log(this.level);
      const currentExercise = this.level.exercises[this.dataset.id - 1];
      if (currentExercise) {
        desc.textContent = currentExercise.description;
        // const area = this.querySelector(".monaco-editor");
        window.addEventListener("keydown", (event) => {
          if (event.ctrlKey && event.key === "d") {
            desc.style.setProperty("background-color", "green");
            event.preventDefault();
            console.log("Correct");
          } else if (event.ctrlKey && event.key !== "d") {
            desc.style.setProperty("background-color", "red");
          }
        });
        desc.focus();
        // console.log(level.exercises);
      }
    } else {
      this.root;
      desc.textContent = "Couldn't Find Exercise";
      alert("Couldn't Get Exercise");
    }
    //console.log(this.root);
  }
}

customElements.define("trainer-page", TrainerPage);
