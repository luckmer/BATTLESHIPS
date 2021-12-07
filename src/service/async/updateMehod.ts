import { mapInterface } from "./../boardCreator/interface/index";
import { shipInterface } from "./../ships/interface/index";

type droppedShipInterface = {
  name: string;
  position: number[];
};

interface droppedBoxShipsInterface {
  name: shipInterface;
  position: number[];
  length: number;
}

class UpdateMethod {
  Update = (
    name:
      | { name: string; position: number[] }
      | droppedBoxShipsInterface
      | droppedShipInterface,
    correctShips: shipInterface[],
    el: mapInterface
  ) => {
    const find = correctShips!.find((ship) => ship.name === name.name);

    return { ...el, used: true, name: find!.name };
  };

  UpdateArrayMethod = (
    selectedBoat: { name: string; position: number[] }[],
    boardData: mapInterface[],
    correctShips: shipInterface[],
    uniqueShipsOptions: droppedBoxShipsInterface[] | droppedShipInterface[]
  ) => {
    const [AirCraft, BattleShip, Cruiser, Carrier, Submarine] = selectedBoat;

    const data = uniqueShipsOptions;

    const clearBoard = boardData.map((el) =>
      el.name !== "enemy"
        ? {
            ...el,
            atack: false,
            attacked: [],
            enemyUsed: false,
            name: "enemy",
            used: false
          }
        : el
    );

    const update = clearBoard.map((el, i) => {
      const ids = el.id;

      if (AirCraft && AirCraft?.position.includes(ids))
        return this.Update(AirCraft, correctShips, el);

      if (BattleShip && BattleShip?.position.includes(ids))
        return this.Update(BattleShip, correctShips, el);

      if (Cruiser && Cruiser?.position.includes(ids))
        return this.Update(Cruiser, correctShips, el);

      if (Submarine && Submarine?.position.includes(ids))
        return this.Update(Submarine, correctShips, el);

      if (Carrier && Carrier?.position.includes(ids))
        return this.Update(Carrier, correctShips, el);

      if (data && data[0]?.position.includes(ids))
        return this.Update(data[0], correctShips, el);

      if (data && data[1]?.position.includes(ids))
        return this.Update(data[1], correctShips, el);

      if (data && data[2]?.position.includes(ids))
        return this.Update(data[2], correctShips, el);

      if (data && data[3]?.position.includes(ids))
        return this.Update(data[3], correctShips, el);

      if (data && data[4]?.position.includes(ids))
        return this.Update(data[4], correctShips, el);

      return el;
    });

    return update;
  };
}

const updateMethod = new UpdateMethod();

export default updateMethod;
