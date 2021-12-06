import { useState, useEffect, useMemo } from "react";
import { mapInterface } from "./interface";
import generator from "./generator";

const GenerateEnemyBoard = (name: string) => {
  const [enemyBoard, setEnemyBoard] = useState<mapInterface[]>([]);

  useEffect(() => {
    const map: mapInterface[] = generator(name);
    setEnemyBoard(map);
  }, [name]);

  const enemyBoardData = useMemo(() => enemyBoard, [enemyBoard]);

  return { enemyBoardData, setEnemyBoard };
};

export default GenerateEnemyBoard;
