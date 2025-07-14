import { Router } from "./services/router.js";
// import { Level } from "./services/Levels.js";
//components
import { LevelsPage } from "./components/LevelsPage.js";
import { ProgressPage } from "./components/ProgressPage.js";

const app = {};
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  console.log("Hello");
  app.router.init();
});
