import { Levels } from "../services/Levels.js";

export class ExerciseController {
  constructor({ root, level, exercise, desc, resetBtn }) {
    this.root = root;
    this.level = level;
    this.exercise = exercise;
    this.desc = desc;
    this.resetBtn = resetBtn;

    this.compare = [];
    this.completed = false;
    this.pressedKeys = new Set();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.startExercise = this.startExercise.bind(this);
    this.resetExercise = this.resetExercise.bind(this);

    this.init();
  }

  init() {
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.desc.textContent = this.exercise.description;
    if (this.completed == false) {
      this.startExercise();
    }
    this.resetBtn.addEventListener("click", this.resetExercise);
  }

  startExercise() {
    this.compare = [];
    this.desc.style.backgroundColor = "";
    this.completed = false;
    window.removeEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  resetCompare() {
    this.compare = [];
  }

  resetExercise() {
    this.compare = [];
    this.completed = false;
    this.desc.style.backgroundColor = "";
    this.startExercise();
  }

  isCorrect() {
    const expected = this.exercise.expectedKeys;
    return (
      this.compare.length === expected.length &&
      this.compare.every((val, i) => val === expected[i])
    );
  }

  handleKeyDown(event) {
    const key = event.key.toLowerCase();
    if (this.completed) return;
    if (!this.pressedKeys.has(key)) {
      this.pressedKeys.add(key);
      this.compare.push(key);
      if (this.compare.length === this.exercise.expectedKeys.length) {
        if (this.isCorrect()) {
          this.completed = true;
          this.desc.style.backgroundColor = "green";
          window.removeEventListener("keydown", this.handleKeyDown);
        } else {
          this.desc.style.backgroundColor = "red";
          setTimeout(() => this.resetCompare(), 1000);
        }
      }
    }
  }
  handleKeyUp(event) {
    this.pressedKeys.delete(event.key.toLowerCase());
  }
}
