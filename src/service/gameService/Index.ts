import { shipInterface } from "./../ships/interface/index";
import { mapInterface, arrInterface } from "../boardCreator/interface";

class Service {
  Response = (
    boardData: mapInterface[],
    shipLocation: number[],
    ship: shipInterface,
    rotateStatus?: boolean
  ) => {
    return boardData.map((el) => {
      const id = Number(el.id);

      if (shipLocation.includes(id)) {
        const usedPanel = boardData.filter((el) =>
          shipLocation.includes(el.id)
        );

        const usedTester = usedPanel.some(({ used }) => used === true);

        if (!usedTester)
          return {
            ...el,
            used: true,
            name: ship.name,
            opponent: el.name,
            rotated: rotateStatus ? true : false
          };
      }

      return el;
    });
  };

  boardMoved = (
    original: mapInterface[] | arrInterface[] | shipInterface[] | undefined,
    updated: mapInterface[] | arrInterface[] | shipInterface[] | undefined
  ) => {
    return JSON.stringify(updated) !== JSON.stringify(original);
  };

  handleBoardClear = (board: mapInterface[]) => {
    return board.map((el) => {
      const used = el.used;

      return used ? { ...el, used: false } : el;
    });
  };
}

const service = new Service();

export default service;
