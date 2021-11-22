import { useState, useEffect, useMemo } from "react";
import { mapInterface } from "./interface";

import generator from "./generator";

const GenerateBoard = (name: string) => {
  const [board, setBoard] = useState<mapInterface[]>([]);

  useEffect(() => {
    const map: mapInterface[] = generator(name);

    setBoard(map);
  }, [name]);

  const boardData = useMemo(() => board, [board]);

  return { boardData, setBoard };
};

export default GenerateBoard;
