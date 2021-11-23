import { GRID_SIZE, START } from "./../constants/index";
import { mapInterface } from "./../boardCreator/interface/index";
import { shipInterface } from "./interface/index";

class ShipFunctions {
  shipPanel = (
    ship: shipInterface,
    shipID: number,
    ID: number,
    rotateShip: string[],
    rotateStatus: boolean
  ) => {
    const boatLocation = this.horizontalShip(ship, shipID, ID);
    const rotatedBoatLocation = this.verticalShip(ship, shipID, ID);

    const collectionStatus = rotateShip.includes(ship.name);

    const shipLocation =
      rotateStatus && collectionStatus ? rotatedBoatLocation : boatLocation;
    return shipLocation;
  };

  horizontalShip = (ship: shipInterface, shipID: number, ID: number) => {
    const shipGrid = new Array(ship.size)
      .fill(1)
      .map((el, i): number => el + i);

    const firstHalf = [...shipGrid].slice(0, shipID - 1).map((el) => ID - el);

    const secondHalf = [...shipGrid]
      .slice(shipID - 1)
      .map((_, i) => (i === 0 ? ID : ID + i));

    const boatLocation = [...firstHalf, ...secondHalf].sort((a, b) => a - b);

    return boatLocation;
  };

  verticalShip = (ship: shipInterface, shipID: number, ID: number) => {
    const rotateBoat = new Array(ship.size).fill(1).map((el, i) => el + i * 10);

    const firstRotate = [...rotateBoat]
      .slice(0, shipID - 1)
      .map((el) => ID - el - 9);

    const secondRotate = [...rotateBoat]
      .slice(shipID - 1)
      .map((_, i) => (i === 0 ? ID : ID + i * 10));

    const rotatedBoatLocation = [...firstRotate, ...secondRotate].sort(
      (a, b) => a - b
    );

    return rotatedBoatLocation;
  };

  ShipCollisionBlocker = (boardData: mapInterface[], shipLocation: number[]) =>
    boardData
      .filter((el) => shipLocation.includes(el.id))
      .map(({ used }) => used)
      .some((el) => el === true);

  BlockShip = (shipLocation: number[], player: mapInterface[]) => {
    const rightWall = player
      .filter(({ id }: { id: number }) => id % 10 === 0)
      .map(({ id }) => id);

    const leftWall = player
      .filter(({ id }: { id: number }) => id % 10 === 1)
      .map(({ id }) => id);

    const checkLeftWall = leftWall.filter((el) => shipLocation.includes(el));
    const checkRightWall = rightWall.filter((el) => shipLocation.includes(el));

    const maxExceeded = shipLocation.filter((el) => el > GRID_SIZE);
    const limitExceeded = shipLocation.filter((el) => el < START);

    const alreadyInUse = this.ShipCollisionBlocker(player, shipLocation);

    if (
      (checkLeftWall.length && checkRightWall.length) ||
      maxExceeded.length ||
      limitExceeded.length ||
      alreadyInUse
    ) {
      return false;
    }
    return true;
  };
}

const shipFunctions = new ShipFunctions();

export default shipFunctions;
