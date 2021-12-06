import { mapInterface } from "./../boardCreator/interface/index";

class ShipGenerator {
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

    const destroyedBoats = enemyBoardData
      .filter((el) => el.attack === true)
      .map((el) => {
        return { attacked: el.attacked, name: el.name, size: life[el.name] };
      });

    return destroyedBoats;
  };
}

const shipGenerator = new ShipGenerator();

export default shipGenerator;
