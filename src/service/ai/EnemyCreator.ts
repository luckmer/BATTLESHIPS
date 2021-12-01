import { mapInterface } from "./../boardCreator/interface/index";
import { useEffect, useState } from "react";
import { shipInterface } from "../ships/interface";
import shipAiGenerator from "./shipAiGenerator";

interface ShipProps {
  locations: number[];
  id: number;
  name: string;
  size: number;
  count: number;
  hitPoints: number;
  hits: number;
}

const Enemy = (
  shipsData: shipInterface[],
  enemyBoardData: mapInterface[],
  setEnemyBoard: React.Dispatch<React.SetStateAction<mapInterface[]>>
) => {
  const [stack, setStack] = useState<ShipProps[]>([]);

  useEffect(() => {
    const ships = shipAiGenerator.generateShipLocations(shipsData);
    if (!ships.length) return;

    const shipLocation = ships.map((ship) => {
      const location = ship.locations;
      if (location.length) {
        return {
          ...ship,
          locations: location.map((text: string) => {
            const replaceZero = text.split("");
            return replaceZero[0] === "0"
              ? parseInt(replaceZero[1])
              : parseInt(text);
          })
        };
      }

      return ship;
    });

    setStack(shipLocation as ShipProps[]);
  }, [shipsData]);

  const handleSpawn = () => {
    const [AirCraft, BattleShip, Cruiser, Submarine, Carrier] = stack;

    const Update = (el: mapInterface, ship: ShipProps) => {
      return { ...el, used: true, name: ship.name, opponent: el.name };
    };

    const update = enemyBoardData.map((el) => {
      const ids = el.id;

      if (AirCraft.locations.includes(ids)) return Update(el, AirCraft);
      if (BattleShip.locations.includes(ids)) return Update(el, BattleShip);
      if (Cruiser.locations.includes(ids)) return Update(el, Cruiser);
      if (Submarine.locations.includes(ids)) return Update(el, Submarine);
      if (Carrier.locations.includes(ids)) return Update(el, Carrier);

      return el;
    });

    setEnemyBoard(update);
  };

  return handleSpawn;
};

export default Enemy;
