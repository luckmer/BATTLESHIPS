import { mapInterface } from "./../boardCreator/interface/index";

interface arrInterface {
  attacked: number[];
  name: string;
  size: string | number;
}

class ShipGenerator {
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

  generateBoats = (enemyBoardData: mapInterface[]) => {
    const life: { [key: string]: number | string } = {
      Battleship: 3,
      Submarine: 2,
      Aircraft: 4,
      Cruiser: 2,
      Carrier: 4
    };

    const findShips = enemyBoardData
      .filter((el) => el.used === true)
      .map((_, i) => i).length;

    if (!findShips) return;

    const controlGameStatus = enemyBoardData
      .filter((el) => el.name !== "enemy")
      .map((el) => {
        return { attacked: el.attacked, name: el.name, size: life[el.name] };
      });

    const deletedDuplicates = this.arrayUnique(controlGameStatus);

    const collectedBoats = deletedDuplicates.filter(
      (el) => el.attacked.length === el.size
    );

    return collectedBoats;
  };
}

const shipGenerator = new ShipGenerator();

export default shipGenerator;
