import { useEffect, useState, useMemo } from "react";
import { shipInterface } from "./interface";
import { shipTypes } from "./index";

const ShipPanel = () => {
  const [ship, setShip] = useState<shipInterface[]>([]);

  useEffect(() => {
    const map: shipInterface[] = shipTypes;
    setShip(map);
  }, []);

  const shipData = useMemo(() => ship, [ship]);

  return { shipData };
};

export default ShipPanel;
