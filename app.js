import { Router } from "./services/router.js";
// import { Level } from "./services/Levels.js";
import { Levels } from "./services/Levels.js";
import { ExerciseController } from "./services/ExerciseController.js";
import { initializeCompleted } from "./services/Builder.js";

//components
import { LevelsPage } from "./components/LevelsPage.js";
import { ProgressPage } from "./components/ProgressPage.js";
import { TrainerPage } from "./components/TrainerPage.js";

window.app = {};
app.router = Router;
app.levels = Levels;
app.initializeCompleted = initializeCompleted;
window.addEventListener("DOMContentLoaded", () => {
  console.log("Hello");
  app.router.init();
  app.initializeCompleted();
});
