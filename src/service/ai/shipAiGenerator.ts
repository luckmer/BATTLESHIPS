import { shipInterface } from "../ships/interface/index";
import { BOARD_SIZE } from "../constants/index";

class AiShipGenerator {
  generateShip = (size: number) => {
    let row;
    let col;

    const direction = ~~(Math.random() * 2);
    if (direction === 1) {
      row = ~~(Math.random() * BOARD_SIZE);
      col = ~~(Math.random() * (BOARD_SIZE - size + 1));
    } else {
      row = ~~(Math.random() * (BOARD_SIZE - size + 1));
      col = ~~(Math.random() * BOARD_SIZE);
    }

    const newShipLocations = [];

    for (let i = 0; i < size; i++) {
      if (direction === 1) {
        newShipLocations.push(`${row}${col + i}`);
      } else {
        newShipLocations.push(`${row + i}${col}`);
      }
    }

    return newShipLocations;
  };

  collision = (locations: string[], ships: { locations: string[] }[]) => {
    let collision = false;

    const rightWall = locations.some(
      (position) => parseInt(position) % 10 === 1
    );

    const leftWall = locations.some(
      (position) => parseInt(position) % 10 === 0
    );

    if (rightWall || leftWall) {
      collision = true;
    }

    ships.forEach((ship) => {
      locations.forEach((location) => {
        if (ship.locations.indexOf(location) >= 0) {
          collision = true;
        }
      });
    });

    return collision;
  };

  generateShipLocations(ships: shipInterface[]) {
    const newShips: { locations: string[] }[] = [];

    ships.forEach((ship) => {
      let locations;
      const size = ship.size;
      do {
        locations = this.generateShip(size);
      } while (this.collision(locations, newShips));

      newShips.push({ locations });
    });

    return newShips;
  }
}
const shipAiGenerator = new AiShipGenerator();

export default shipAiGenerator;
