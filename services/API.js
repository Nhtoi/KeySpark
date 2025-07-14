export class API {
  async fetchExercise(difficulty) {
    const res = await fetch(`../Data/${difficulty}Levels.json`);
    const exercies = await res.json();
    return exercies;
  }
}
