export class API {
  async fetchExercise(difficulty) {
    const res = await fetch(`../Data/${difficulty}Levels.json`);
    const exercies = await res.json();
    return exercies;
  }
}

export async function getExerciseById(difficulty, id) {
  console.log("THIS IS HERE", difficulty, id);
  const res = await fetch(`../Data/${difficulty}Levels.json`);
  const exercies = await res.json();
  return exercies.find((exercie) => exercie.id == id);
}
