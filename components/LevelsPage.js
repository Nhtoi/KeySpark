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
    const levelSelector = this.root.querySelector("select");

    const CreateLevel = async (difficulty) => {
      const completedFromLocalStorage = JSON.parse(
        localStorage.getItem("completed")
      );

      console.log("ENTIRECOMPLTEDARRAY", completedFromLocalStorage);
      const api = new API();
      const data = await api.fetchExercise(difficulty);
      const level = new Levels(difficulty);
      level.exercises = data;
      const levelContainer = this.root.getElementById("level-information");
      levelContainer.innerText = "";
      level.exercises.forEach((element) => {
        const h1 = document.createElement("h1");
        const completed = document.createElement("input");
        completed.setAttribute("type", "checkbox");
        completed.setAttribute("disabled", "true");
        if (
          completedFromLocalStorage.completed[element.difficulty][element.id] ==
          true
        ) {
          completed.setAttribute("checked", "true");
        }

        h1.dataset.id = element.id;
        const description = element["description"];
        h1.textContent = description;
        levelContainer.append(completed);
        levelContainer.append(h1);
      });
      Array.from(levelContainer.children).forEach((element) => {
        if (element.tagName == "H1") {
          element.addEventListener("click", function handleClick() {
            const id = element.dataset.id;
            element.isCompleted = false;
            window.currentLevel = level;
            app.router.go(`/trainer-${id}`);
          });
        }
      });
    };

    levelSelector.addEventListener("change", () => {
      const difficulty = this.root.getElementById("levels").value;
      CreateLevel(difficulty);
    });
    CreateLevel("Beginner");

    console.log(this.root);
  }
}

customElements.define("levels-page", LevelsPage);
