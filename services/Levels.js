export class Levels {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.currentIndex = 0;
    this.exercises = [];
  }
  resetLevel() {
    this.currentIndex = 0;
  }
  nextLevel() {
    if (this.currentIndex > this.exercises.length - 1) {
      this.currentIndex += 1;
    }
  }
  getCurrentExercise() {
    return this.exercises[this.currentIndex];
  }
}
