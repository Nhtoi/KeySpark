import Builder from "../services/Builder.js";
import { Levels } from "../services/Levels.js";
import { API } from "../services/API.js";

export class LevelsPage extends HTMLElement {
  constructor() {
    super();
    const element = this;
    const cssPath = "../styles/LevelsPage.css";
    const templateId = "levels-template";
    const builder = new Builder(element, cssPath, templateId);
    builder.build().then((root) => {
      this.root = root;
      this.onBuilt();
    });
  }
  onBuilt() {
    const button = this.root.getElementById("select-level");
    const CreateLevel = async (difficulty) => {
      console.log(difficulty);
      const api = new API();
      const data = await api.fetchExercise(difficulty);
      const level = new Levels(difficulty);
      level.exercises = data;

      const levelContainer = this.root.getElementById("level-information");
      levelContainer.innerText = "";
      level.exercises.forEach((element) => {
        const h1 = document.createElement("h1");
        h1.dataset.id = element.id;
        const description = element["description"];
        h1.textContent = description;
        levelContainer.append(h1);
      });
      Array.from(levelContainer.children).forEach((element) => {
        element.addEventListener("click", () => {
          const id = element.dataset.id;
          console.log(id);
          console.log(level.exercises[id - 1].expectedKeys);
        });
      });
      const area = document.getElementById("exercise-area");
      window.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "d") {
          event.preventDefault();
          console.log("Correct");
        }
      });
      area.focus();
      console.log(level.exercises);
    };

    button.addEventListener("click", () => {
      const difficulty = this.root.getElementById("levels").value;
      CreateLevel(difficulty);
    });

    console.log(this.root);
  }
}

customElements.define("levels-page", LevelsPage);
