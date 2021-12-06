import { useState, useContext } from "react";

import GenerateEnemyBoard from "../service/boardCreator/enemyBoard";
import GenerateBoard from "../service/boardCreator/board";
import ShipPanel from "../service/ships/shipPanel";
import ComputerGame from "../components/computer/computerGame";
import service from "../service/gameService/Index";
import Enemy from "../service/ai/EnemyCreator";
import AsyncComponet from "../service/async";

import { DragAndDropShip, PlayerDragAndDrop } from "../service/dragAndDrop";
import { Section, Rotate, Footer, ShipContainer } from "../css/game.style";
import { AppContext } from "../store/store";
import {
  GameOverPanel,
  PlayerBoard,
  ButtonPanel,
  Ships
} from "../components/index";

const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState("right");
  const { enemyBoardData, setEnemyBoard } = GenerateEnemyBoard("enemy");
  const { boardData, setBoard } = GenerateBoard("enemy");
  const { shipData, shipsData, setShip } = ShipPanel();
  const { state, dispatch } = useContext(AppContext);

  const PROPS = {
    dispatch,
    shipData,
    boardData,
    setBoard,
    setShip,
    state,
    shipsData,
    enemyBoardData,
    currentPlayer,
    setCurrentPlayer
  };

  const { handleDragStartShip, handleDropShip, handleRotateShip } =
    DragAndDropShip(state.rotateShip, dispatch);

  const { handleDragOver, handleDropPlayer, handleMouseOver } =
    PlayerDragAndDrop({ ...PROPS });

  AsyncComponet({ ...PROPS });

  const handleRestartGame = () => {
    const clearUserPanel = service.handleBoardClear(boardData);
    const clearAiPanel = service.handleBoardClear(enemyBoardData);

    setShip(shipsData);
    setEnemyBoard(clearAiPanel);
    setBoard(clearUserPanel);
  };

  const generate = Enemy(shipsData, enemyBoardData, setEnemyBoard);
  const handleStartGame = () => {
    generate();
  };

  const handleShipAttack = (id: number) => {
    if (currentPlayer === "left") return;

    const findFire = enemyBoardData.find((el) => el.id === id);
    const findShips = enemyBoardData
      .filter((el) => el.used === true)
      .map((_, i) => i).length;

    if (!findFire || !findShips || findFire?.attack) return;

    const update = enemyBoardData.map((el) => {
      if (el.id === findFire.id) return { ...el, attack: true };
      if (el.name === findFire.name)
        return { ...el, attacked: [...el.attacked, findFire.id] };
      return el;
    });

    setCurrentPlayer("left");
    setEnemyBoard(update);
  };

  const ShipsProps = {
    shipData,
    state,
    handleDragOver,
    handleDragStartShip,
    handleDropShip,
    handleRotateShip,
    handleMouseOver
  };

  const winner = state.gameOver;

  return winner ? (
    <GameOverPanel shipsData={shipsData} enemyBoardData={enemyBoardData} />
  ) : (
    <Section>
      <Rotate>
        <PlayerBoard
          boardData={boardData}
          handleDragOver={handleDragOver}
          handleDropPlayer={handleDropPlayer}
        />
        <ComputerGame
          shipData={enemyBoardData}
          handleShipAttack={handleShipAttack}
        />
      </Rotate>
      <Footer>
        <ShipContainer>
          {state.buttonStatus ? (
            <ButtonPanel
              handleStartGame={handleStartGame}
              handleRestartGame={handleRestartGame}
            />
          ) : (
            <Ships props={ShipsProps} />
          )}
        </ShipContainer>
      </Footer>
    </Section>
  );
};

export default Game;
