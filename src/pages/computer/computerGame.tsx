import { Fragment, useEffect, useState } from "react";
import { Div, Grid } from "../../css/game.style";
import GenerateBoard from "../../service/boardCreator/board";
import { shipInterface } from "../../service/ships/interface";
import shipAiGenerator from "./shipAiGenerator";

interface propsInterface {
  shipData: shipInterface[];
}

const ComputerGame = (props: propsInterface) => {
  const [stack, setStack] = useState<string[][]>([]);
  const { shipData } = props;
  const { boardData, setBoard } = GenerateBoard("enemy");

  useEffect(() => {
    const ships = shipAiGenerator.generateShipLocations(shipData);
    if (!ships.length) return;
    const shipLocation = ships.map(
      ({ locations }: { locations: string[] }) => locations
    );
    setStack(shipLocation);
  }, [shipData]);

  const handleSpawn = () => {
    const generateNumbers = stack.map((arr: string[]) => {
      return arr.map((text) => {
        const replaceZero = text.split("");

        return replaceZero[0] === "0"
          ? parseInt(replaceZero[1])
          : parseInt(text);
      });
    });

    const combineNumbers = generateNumbers.reduce(
      (array, isArray) =>
        Array.isArray(isArray) ? array.concat(isArray) : array,
      []
    );

    const update = boardData.map((el) =>
      combineNumbers.includes(el.id) ? { ...el, used: true } : el
    );

    setBoard(update);
  };

  return (
    <Fragment>
      <button onClick={handleSpawn}>Spawn</button>
      <Div>
        {boardData.map(({ id, used }: { id: number; used: boolean }) => (
          <Grid key={id} boat={used} id={String(id)} />
        ))}
      </Div>
    </Fragment>
  );
};

export default ComputerGame;
