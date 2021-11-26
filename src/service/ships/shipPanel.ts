import { useEffect, useState, useMemo } from "react";
import { shipInterface } from "./interface";
import { shipTypes } from "./index";

const ShipPanel = () => {
  const [ship, setShip] = useState<shipInterface[]>([]);
  const [ships, setShips] = useState<shipInterface[]>([]);

  useEffect(() => {
    const map: shipInterface[] = shipTypes;
    setShip(map);
    setShips(map);
  }, []);

  const shipData = useMemo(() => ship, [ship]);
  const shipsData = useMemo(() => ships, [ships]);

  return { shipData, shipsData, setShip };
};

export default ShipPanel;
