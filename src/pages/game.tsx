import { useState, useEffect, useContext } from "react";

import GenerateEnemyBoard from "../service/boardCreator/enemyBoard";
import GenerateBoard from "../service/boardCreator/board";
import ShipPanel from "../service/ships/shipPanel";
import ComputerGame from "../components/computer/computerGame";
import service from "../service/gameService/Index";
import Enemy from "../service/ai/EnemyCreator";

import { DragAndDropShip, PlayerDragAndDrop } from "../service/dragAndDrop";
import { Section, Rotate, Footer, ShipContainer } from "../css/game.style";
import { EnemyShipDestroyer, AiShipDestroyer } from "../service/callback";
import { arrInterface } from "../service/boardCreator/interface";
import { AppContext } from "../store/store";
import { Types } from "../store/types/index";
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

  const PROPS = { dispatch, shipData, boardData, setBoard, setShip, state };

  const { handleDragStartShip, handleDropShip, handleRotateShip } =
    DragAndDropShip(state.rotateShip, dispatch);

  const { handleDragOver, handleDropPlayer, handleMouseOver } =
    PlayerDragAndDrop({ ...PROPS });

  useEffect(() => {
    if (!state.rotateShip.length) {
      dispatch({ type: Types.Rotate_off, payload: { status: false } });
      return;
    }

    const keyPress = (e: KeyboardEvent) => {
      if (e.key === "r" && state.rotateShip.length) {
        let value = state.rotateStatus;
        dispatch({
          type:
            e.key === "r" && state.rotateShip.length
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
  }, [dispatch, state.rotateStatus, state.rotateShip.length]);

  useEffect(() => {
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
    } else dispatch({ type: Types.On, payload: { buttonStatus: false } });
  }, [shipData, dispatch, boardData]);

  useEffect(() => {
    EnemyShipDestroyer(
      enemyBoardData,
      state,
      (callback: arrInterface[] | undefined) => {
        dispatch({
          type: Types.Set_Player_Destroyed_Boats,
          payload: { player: callback }
        });
      }
    );
  }, [enemyBoardData, dispatch, state]);

  useEffect(() => {
    const noMoves = boardData.filter((el) => el.attack !== true).length;
    if (noMoves <= 1) return;
    if (currentPlayer === "right") return;
    setCurrentPlayer("right");

    AiShipDestroyer(boardData, setBoard, state, (callback) => {
      console.log(callback);
      dispatch({
        type: Types.Set_Ai_Destroyed_Boats,
        payload: { ai: callback }
      });
    });
  }, [boardData, setBoard, currentPlayer, state, dispatch]);

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
      if (el.id === findFire.id) {
        return { ...el, attack: true };
      }

      if (el.name === findFire.name) {
        return { ...el, attacked: [...el.attacked, findFire.id] };
      }

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
