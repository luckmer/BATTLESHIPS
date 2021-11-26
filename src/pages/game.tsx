import { useState, useEffect, useContext } from "react";

import shipFunctions from "../service/ships/shipFunctions";
import GenerateBoard from "../service/boardCreator/board";
import ShipPanel from "../service/ships/shipPanel";
import ComputerGame from "./computer/computerGame";

import { mapInterface } from "../service/boardCreator/interface";
import { boardsInterface } from "./interface";
import shipAiGenerator from "../service/ai/shipAiGenerator";

import styled from "styled-components";

import GenerateEnemyBoard from "../service/boardCreator/enemyBoard";
import { shipInterface } from "../service/ships/interface";
import { AppContext } from "../store/store";
import { Types } from "../store/types/index";
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
  const [uniqueShipKey, setUniqueShipKey] = useState(0);
  const [dragged, setDragged] = useState(false);

  const { state, dispatch } = useContext(AppContext);
  const { enemyBoardData, setEnemyBoard } = GenerateEnemyBoard("enemy");
  const { boardData, setBoard } = GenerateBoard("player");
  const { shipData, shipsData, setShip } = ShipPanel();
  const rotateStatus = state.rotateStatus;

  const handleRotateShip = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;

    const id = target.id;

    if (rotateShip.includes(id)) {
      setRotateShip(rotateShip.filter((value: string) => value !== id));
    } else setRotateShip((prev: string[]) => prev.concat(id));
  };

  const handleDragStartShip = (e: React.DragEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLDivElement).id;
    e.dataTransfer.setData("id", target);
    setDragged(true);
  };

  const handleDropShip = (e: React.DragEvent<HTMLDivElement>) => {
    setDragged(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
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

    dispatch({
      type: Types.Incorrect_status,
      payload: {
        status: true,
        response: shipBlocker
          ? "success"
          : "you couldn't put the boat in the water"
      }
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

  const handleMouseOver = (el: number) => {
    if (dragged) return;
    setUniqueShipKey(el);
  };

  useEffect(() => {
    if (!rotateShip.length) {
      dispatch({ type: Types.Rotate_off, payload: { status: false } });
      return;
    }

    const keyPress = (e: KeyboardEvent) => {
      if (e.key === "r" && rotateShip.length) {
        let value = state.rotateStatus;

        dispatch({
          type:
            e.key === "r" && rotateShip.length
              ? Types.Rotate_on
              : Types.Rotate_off,
          payload: {
            status: (value = value ? false : true)
          }
        });
      }
    };

    document.body.addEventListener("keypress", keyPress);

    return () => document.body.removeEventListener("keypress", keyPress);
  }, [rotateShip, rotateStatus, dispatch, state.rotateStatus]);

  useEffect(() => {
    console.log(state.moveStatus);
    if (state.moveStatus.response) {
      setTimeout(() => {
        dispatch({
          type: Types.Incorrect_status,
          payload: { status: false, response: "" }
        });
      }, 2000);
    }
  }, [state, dispatch]);

  useEffect(() => {
    const allShipsInOnePlace = boardData
      .map(({ used }: { used: boolean }) => used)
      .filter((el) => el).length;

    if (allShipsInOnePlace === 20) {
      dispatch({ type: Types.Off, payload: { buttonStatus: true } });
      return;
    } else {
      dispatch({ type: Types.On, payload: { buttonStatus: false } });
    }
  }, [shipData, dispatch, boardData]);

  const generateEnemy = Enemy(shipsData, enemyBoardData, setEnemyBoard);

  const handleRestartGame = () => {};

  const handleStartGame = () => {
    generateEnemy();
  };

  const enemyShips = enemyBoardData;

  return (
    <Section>
      <Rotate>
        <Div>
          {boardData.map(
            ({ id, used }: { id: number; used: string | boolean }, i) => (
              <Grid
                id={String(i + 1)}
                key={id}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDropPlayer(e)}
                boat={used}
              />
            )
          )}
        </Div>
        <ComputerGame shipData={enemyShips} />
      </Rotate>
      <Footer>
        <ShipContainer>
          {state.buttonStatus ? (
            <GameDiv>
              <GameButton>
                <Button onClick={handleStartGame}>Start Game</Button>
              </GameButton>
              <GameButton>
                <Button onClick={handleRestartGame}>Restart</Button>
              </GameButton>
            </GameDiv>
          ) : (
            shipData.map(({ id, size, name }: boardsInterface) => {
              const findShip = rotateShip.some((el: string) => el === name);
              const rotateBlocker = rotateStatus && findShip;

              const shipBlocks = new Array(size)
                .fill(1)
                .map((el: number, i) => {
                  return { name: name, id: el + i };
                });

              return (
                <ShipGrid status={rotateBlocker} key={id}>
                  <Ship
                    draggable
                    onDragOver={(e) => handleDragOver(e)}
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
                        onMouseOver={() => handleMouseOver(data.id)}
                      />
                    ))}
                  </Ship>
                </ShipGrid>
              );
            })
          )}
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

const Enemy = (
  shipsData: shipInterface[],
  enemyBoardData: mapInterface[],
  setEnemyBoard: React.Dispatch<React.SetStateAction<mapInterface[]>>
) => {
  const [stack, setStack] = useState<string[][]>([]);

  useEffect(() => {
    const ships = shipAiGenerator.generateShipLocations(shipsData);
    if (!ships.length) return;
    const shipLocation = ships.map(
      ({ locations }: { locations: string[] }) => locations
    );
    setStack(shipLocation);
  }, [shipsData]);

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

    const update = enemyBoardData.map((el) =>
      combineNumbers.includes(el.id) ? { ...el, used: true } : el
    );

    setEnemyBoard(update);
  };

  return handleSpawn;
};

const GameDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 0 20 px;
  flex-flow: row wrap;
`;

const GameButton = styled.div`
  margin: 0 20px;
`;

const Button = styled.button`
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  position: relative;
  display: inline-block;
  background: #0868cf;
  color: #fff;
  z-index: 1;
  border: none;
  border-bottom: 1px solid white;

  &:after {
    border-bottom: 1px solid black;
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background: white;
    transition: all 0.3s ease;
  }
  &:hover {
    color: #000;
  }
  &:hover:after {
    left: 0;
    width: 100%;
  }
  &:active {
    top: 2px;
  }
`;
