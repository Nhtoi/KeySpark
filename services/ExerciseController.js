import { Levels } from "../services/Levels.js";
import { setCompleted, getCompleted } from "./Builder.js";
export class ExerciseController {
  constructor({ root, level, exercise, desc, displayArea, resetBtn }) {
    this.root = root;
    this.level = level;
    this.exercise = exercise;
    this.displayArea = displayArea;
    this.desc = desc;
    this.resetBtn = resetBtn;
    this.compare = [];
    this.pressedKeys = new Set();
    this.showAnswerBtn = this.root.getElementById("showAnswerBtn");
    this.displayAnswer = this.root.getElementById("showAnswerDisplay");
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.startExercise = this.startExercise.bind(this);
    this.resetExercise = this.resetExercise.bind(this);
    this.completed = getCompleted(this.exercise.difficulty, this.exercise.id);
    this.init();
    this.showAnswerBtn.addEventListener("click", this.showAnswer.bind(this));
  }
  init() {
    if (this.completed == true) {
      this.showAnswerBtn.disable;
      this.desc.style.backgroundColor = "green";
      this.displayArea.innerHTML = this.exercise.expectedKeys.join(" + ");
    }
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.desc.textContent = this.exercise.description;
    if (this.completed == false) {
      this.startExercise();
    }
    this.resetBtn.addEventListener("click", this.resetExercise);
  }
  showAnswer() {
    console.log("Show Answer");
    this.displayAnswer.innerHTML = this.exercise.expectedKeys.join(" + ");
    setTimeout(() => this.clearDisplay(this.displayAnswer), 2000);
  }
  startExercise() {
    this.compare = [];
    this.desc.style.backgroundColor = "";
    this.completed = false;
    window.removeEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  displayKey(key) {
    if (this.displayArea.innerHTML == "") {
      this.displayArea.innerHTML += `${key}`;
    } else {
      this.displayArea.innerHTML += ` + ${key}`;
    }
  }
  clearDisplay(el = this.displayArea) {
    if (el && el.innerHTML !== undefined) {
      el.innerHTML = "";
    }
  }

  resetCompare() {
    this.clearDisplay();
    this.compare = [];
  }

  resetExercise() {
    this.compare = [];
    this.completed = false;
    this.desc.style.backgroundColor = "";
    setCompleted(this.exercise.difficulty, this.exercise.id, false);
    this.clearDisplay();
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
      console.log(this.displayKey(key));
      this.pressedKeys.add(key);
      this.compare.push(key);
      if (this.compare.length === this.exercise.expectedKeys.length) {
        if (this.isCorrect()) {
          this.completed = true;
          setCompleted(this.exercise.difficulty, this.exercise.id, true);
          this.desc.style.backgroundColor = "green";
          window.removeEventListener("keydown", this.handleKeyDown);
        } else {
          this.desc.style.backgroundColor = "red";
          setTimeout(() => this.resetCompare(), 1000);
          setTimeout(() => this.clearDisplay(), 1000);
        }
      }
    }
  }
  handleKeyUp(event) {
    this.pressedKeys.delete(event.key.toLowerCase());
  }
}
