import { useState, useEffect } from "react";
import GenerateBoard from "../service/boardCreator/board";

import ShipPanel from "../service/ships/shipPanel";
import { boardsInterface } from "./interface";
import { GRID_SIZE, START } from "../service/constants";
import { mapInterface } from "../service/boardCreator/interface";
import { shipInterface } from "../service/ships/interface";

import {
  Section,
  Rotate,
  Div,
  Grid,
  Footer,
  ShipContainer,
  ShipGrid,
  Ship
} from "../css/game.style";

interface ObjInterface {
  status: boolean;
  response: string;
}

const Game = () => {
  const [rotateShip, setRotateShip] = useState<string[]>([]);
  const [rotateStatus, setRotateStatus] = useState(false);
  const [uniqueShipKey, setUniqueShipKey] = useState(0);
  const [dragged, setDragged] = useState(false);
  const [moveStatus, setMoveStatus] = useState<ObjInterface>({
    status: false,
    response: ""
  });

  const player = GenerateBoard("player").boardData;
  const enemy = GenerateBoard("enemy").boardData;
  const { shipData } = ShipPanel();

  const handleRotateShip = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;

    const id = target.id;

    if (rotateShip.includes(id)) {
      setRotateShip(rotateShip.filter((value: string) => value !== id));
    } else setRotateShip((prev: string[]) => prev.concat(id));
  };

  useEffect(() => {
    if (!rotateShip.length) {
      setRotateStatus(false);
      return;
    }

    const keyPress = (e: KeyboardEvent) => {
      if (e.key === "r" && rotateShip.length) setRotateStatus(!rotateStatus);
    };

    document.body.addEventListener("keypress", keyPress);

    return () => document.body.removeEventListener("keypress", keyPress);
  }, [rotateShip, rotateStatus]);

  const handleDragShip = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const handleDragStartShip = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const targetId = target.id;
    e.dataTransfer.setData("id", targetId);
    setDragged(true);
  };

  const handleDropShip = (e: React.DragEvent<HTMLDivElement>) => {
    setDragged(false);
  };

  const handleDragOverPlayer = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropPlayer = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    const target = e.target as HTMLDivElement;
    const droppedShip = e.dataTransfer.getData("id");
    const ID = Number(target.id);
    const shipID = uniqueShipKey;

    setDragged(false);
    let ship = shipData!.find(
      ({ name }: { name: string }) => name === droppedShip
    );

    if (!ship) return;

    const shipBlocker = BlockShip(ship, shipID, ID, player);

    setMoveStatus({
      status: true,
      response: shipBlocker
        ? "success"
        : "you couldn't put the boat in the water"
    });
  };

  const handleSetupShipNumber = (el: number) => {
    if (dragged) return;
    setUniqueShipKey(el);
  };

  useEffect(() => {
    if (moveStatus.response) {
      setTimeout(() => {
        setMoveStatus({ status: false, response: "" });
      }, 1500);
    }
  }, [moveStatus]);

  console.log(moveStatus);

  return (
    <Section>
      <Rotate>
        <Div>
          {player.map(({ id }: { id: number }, i: any) => (
            <Grid
              id={i + 1}
              key={id}
              onDragOver={(e) => handleDragOverPlayer(e)}
              onDrop={(e) => handleDropPlayer(e, id)}
            ></Grid>
          ))}
        </Div>
        <Div>
          {enemy.map(({ id }: { id: number }) => (
            <Grid key={id} />
          ))}
        </Div>
      </Rotate>
      <Footer>
        <ShipContainer>
          {shipData.map(({ id, size, name }: boardsInterface) => {
            const findShip = rotateShip.some((el: string) => el === name);
            const rotateBlocker = rotateStatus && findShip;

            const shipBlocks = new Array(size).fill(1).map((el: number, i) => {
              return { name: name, id: el + i };
            });

            return (
              <ShipGrid status={rotateBlocker} key={id}>
                <Ship
                  draggable
                  onDragOver={(e) => handleDragShip(e)}
                  onDragStart={(e) => handleDragStartShip(e)}
                  onDrop={(e) => handleDropShip(e)}
                  size={size}
                  status={rotateBlocker}
                  setupColor={findShip}
                  id={name}
                >
                  {shipBlocks.map((data: { name: string; id: number }) => (
                    <div
                      key={data.id}
                      onClick={(e) => handleRotateShip(e)}
                      id={String(data.name)}
                      onMouseOver={() => handleSetupShipNumber(data.id)}
                    />
                  ))}
                </Ship>
              </ShipGrid>
            );
          })}
        </ShipContainer>
      </Footer>
    </Section>
  );
};

export default Game;

const BlockShip = (
  ship: shipInterface,
  shipID: number,
  ID: number,
  player: mapInterface[]
) => {
  const shipGrid = new Array(ship.size).fill(1).map((el, i): number => el + i);

  const firstHalf = [...shipGrid].slice(0, shipID - 1).map((el) => ID - el);

  const secondHalf = [...shipGrid]
    .slice(shipID - 1)
    .map((_, i) => (i === 0 ? ID : ID + i));

  const boatLocation = [...firstHalf, ...secondHalf].sort((a, b) => a - b);

  const rightWall = player
    .filter(({ id }: { id: number }) => id % 10 === 0)
    .map(({ id }) => id);

  const leftWall = player
    .filter(({ id }: { id: number }) => id % 10 === 1)
    .map(({ id }) => id);

  const checkLeftWall = leftWall.filter((el) => boatLocation.includes(el));
  const checkRightWall = rightWall.filter((el) => boatLocation.includes(el));

  const maxExceeded = boatLocation.filter((el) => el > GRID_SIZE);
  const limitExceeded = boatLocation.filter((el) => el < START);

  if (
    (checkLeftWall.length && checkRightWall.length) ||
    maxExceeded.length ||
    limitExceeded.length
  ) {
    return false;
  }
  return true;
};
