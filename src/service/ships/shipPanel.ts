import { useEffect, useState, useMemo } from "react";
import { shipInterface } from "./interface";
import { shipTypes } from "./index";

const ShipPanel = (name: string) => {
  const [ship, setShip] = useState<shipInterface[]>([]);

  useEffect(() => {
    const map: shipInterface[] = shipTypes;
    setShip(map);
  }, [name]);

  const boardData = useMemo(() => ship, [ship]);

  return boardData;
};

export default ShipPanel;
