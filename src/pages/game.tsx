import { useState, useEffect } from "react";

import shipFunctions from "../service/ships/shipFunctions";
import GenerateBoard from "../service/boardCreator/board";
import ShipPanel from "../service/ships/shipPanel";
import ComputerGame from "./computer/computerGame";

import { mapInterface } from "../service/boardCreator/interface";
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

interface ObjInterface {
  status: boolean;
  response: string;
}

const Game = () => {
  const [rotateShip, setRotateShip] = useState<string[]>([]);
  const [rotateStatus, setRotateStatus] = useState(false);
  const [test, setTest] = useState<any[][]>([]);
  const [uniqueShipKey, setUniqueShipKey] = useState(0);
  const [player, setPlayer] = useState<string>("user");
  const [dragged, setDragged] = useState(false);

  const [moveStatus, setMoveStatus] = useState<ObjInterface>({
    status: false,
    response: ""
  });

  const { boardData, setBoard } = GenerateBoard("player");
  const { shipData, setShip } = ShipPanel();

  const handleRotateShip = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;

    const id = target.id;

    if (rotateShip.includes(id)) {
      setRotateShip(rotateShip.filter((value: string) => value !== id));
    } else setRotateShip((prev: string[]) => prev.concat(id));
  };
  const handleDragShip = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragStartShip = (e: React.DragEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLDivElement).id;
    e.dataTransfer.setData("id", target);
    setDragged(true);
  };
  const handleDropShip = (e: React.DragEvent<HTMLDivElement>) => {
    setDragged(false);
  };
  const handleDragOverPlayer = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDropPlayer = (e: React.DragEvent<HTMLDivElement>) => {
    const { shipPanel, ShipCollisionBlocker, BlockShip } = shipFunctions;
    const target = e.target as HTMLDivElement;
    const droppedShip = e.dataTransfer.getData("id");
    const ID = Number(target.id);
    const shipID = uniqueShipKey;

    setDragged(false);

    let ship = shipData!.find(
      ({ name }: { name: string }) => name === droppedShip
    );

    if (!ship) return;

    const shipLocation = shipPanel(ship, shipID, ID, rotateShip, rotateStatus);

    const shipBlocker = BlockShip(shipLocation, boardData);

    setMoveStatus({
      status: true,
      response: shipBlocker
        ? "success"
        : "you couldn't put the boat in the water"
    });

    if (!shipBlocker) return;

    const update = Response(boardData, shipLocation);

    setBoard(update);

    const alreadyInUse = ShipCollisionBlocker(boardData, shipLocation);

    if (alreadyInUse) return;

    const deleteShip = shipData.filter((el) => el.name !== ship!.name);
    const clearRotate = rotateShip.filter((name) => name !== ship!.name);

    setRotateShip(clearRotate);
    setShip(deleteShip);
  };
  const handleSetupShipNumber = (el: number) => {
    if (dragged) return;
    setUniqueShipKey(el);
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

  useEffect(() => {
    if (moveStatus.response) {
      setTimeout(() => {
        setMoveStatus({ status: false, response: "" });
      }, 1500);
    }
  }, [moveStatus]);

  return (
    <Section>
      <Rotate>
        <Div>
          {boardData.map(
            ({ id, used }: { id: number; used: string | boolean }, i) => (
              <Grid
                id={String(i + 1)}
                key={id}
                onDragOver={(e) => handleDragOverPlayer(e)}
                onDrop={(e) => handleDropPlayer(e)}
                boat={used}
              />
            )
          )}
        </Div>
        <ComputerGame shipData={shipData} />
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

const Response = (boardData: mapInterface[], shipLocation: number[]) => {
  return boardData.map((el) => {
    const id = Number(el.id);

    if (shipLocation.includes(id)) {
      const usedPanel = boardData.filter((el) => shipLocation.includes(el.id));

      const usedTester = usedPanel.some(({ used }) => used === true);

      if (!usedTester) return { ...el, used: true };
    }
    return el;
  });
};
