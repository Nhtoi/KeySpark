import Builder from "../services/Builder.js";
import { ExerciseController } from "../services/ExerciseController.js";
import { Levels } from "../services/Levels.js";
import { initializeCompleted, getCompleted } from "../services/Builder.js";
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
      const resetBtn = this.root.getElementById("resetBtn");
      const displayArea = this.root.getElementById("displayArea");
      const level = window.currentLevel;
      const currentExercise = level.exercises[this.dataset.id - 1];
      const isCompleted = getCompleted(
        currentExercise.difficulty,
        currentExercise.id
      );
      if (currentExercise) {
        new ExerciseController({
          root: this.root,
          level,
          exercise: currentExercise,
          desc,
          displayArea,
          resetBtn,
          isCompleted,
        });
        //console.log("Completed?", isCompleted);
      }
    } else {
      const desc = this.root.querySelector("h2");
      desc.textContent = "Couldn't Find Exercise";
      alert("Couldn't Get Exercise");
    }
  }
}

customElements.define("trainer-page", TrainerPage);
