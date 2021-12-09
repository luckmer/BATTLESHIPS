import { arrInterface } from "../interface/arrInterface";

class BoatDestructionDetection {
  arrayUnique = (array: arrInterface[]) => {
    let a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i].name === a[j].name) {
          a.splice(j--, 1);
        }
      }
    }

    return a;
  };

  generateChecker = (ships: arrInterface[] | undefined) => {
    if (!ships?.length) return;

    const deletedDuplicates = this.arrayUnique(ships);

    const collectedBoats = deletedDuplicates.filter(
      (el) => el.attacked.length === el.size
    );

    return collectedBoats;
  };
}
const boatDestructionDetection = new BoatDestructionDetection();

export default boatDestructionDetection;
