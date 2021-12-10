import { useState, useEffect } from "react";
import { InitialStateType } from "../../store/interface";

const ShipDeconstructor = (arr: number[][]) =>
  arr.reduce(
    (array, isArray) =>
      Array.isArray(isArray) ? array.concat(isArray) : array,
    []
  );

export const BoatEndStartGenerator = (state: InitialStateType) => {
  const [idsStart, setIdsStart] = useState<number[]>([]);
  const [idsEnd, setIdsEnd] = useState<number[]>([]);

  useEffect(() => {
    const updateMethod = state.selectedShipOptions.setBoats;
    const updateShips = state.selectedShipOptions.updateCurrentMove;

    const getCurvedAngle = state.selectedShipOptions.setBoats.length
      ? [...updateMethod, ...updateShips]
      : state.droppedPlayerShips;

    const firstShipPanel = getCurvedAngle.map((el) => {
      const position = el.position;

      return [position[0]];
    });

    const LastShipPanel = getCurvedAngle.map((el) => {
      const position = el.position;

      return [position[position.length - 1]];
    });

    const firstids = ShipDeconstructor(firstShipPanel);
    const lastids = ShipDeconstructor(LastShipPanel);
    setIdsStart(firstids);
    setIdsEnd(lastids);
  }, [state]);

  return [idsStart, idsEnd];
};
