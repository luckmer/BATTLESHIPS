import { useState, useEffect } from "react";
import GenerateBoard from "../service/boardCreator/board";

import ShipPanel from "../service/ships/shipPanel";
import { boardsInterface } from "./interface";
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

const Game = () => {
  const [rotateShip, setRotateShip] = useState<string[]>([]);
  const [rotateStatus, setRotateStatus] = useState(false);
  const [uniqueShipKey, setUniqueShipKey] = useState(0);
  const [dragged, setDragged] = useState(false);
  const player = GenerateBoard("player");
  const enemy = GenerateBoard("enemy");
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

    const shipGrid = new Array(ship.size)
      .fill(1)
      .map((el, i): number => el + i);

    console.log(ID, shipID, shipGrid);
  };

  const handleSetupShipNumber = (el: number) => {
    if (dragged) return;
    setUniqueShipKey(el);
  };
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
