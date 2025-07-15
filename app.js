import { Router } from "./services/router.js";
// import { Level } from "./services/Levels.js";
//components
import { Levels } from "./services/Levels.js";
import { LevelsPage } from "./components/LevelsPage.js";
import { ProgressPage } from "./components/ProgressPage.js";
import { TrainerPage } from "./components/TrainerPage.js";

window.app = {};
app.router = Router;
app.levels = Levels;

window.addEventListener("DOMContentLoaded", () => {
  console.log("Hello");
  app.router.init();
});
