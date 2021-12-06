import { MAX_SHIP_SIZE } from "./../constants/index";
import { useEffect } from "react";
import { asyncInterface } from "./interface";
import { arrInterface } from "./../boardCreator/interface/index";
import { Types } from "./../../store/types/index";
import updateMethod from "./updateMehod";
import {
  EnemyShipDestroyer,
  AiShipDestroyer
} from "../../service/callback/index";
import service from "../../service/gameService/Index";

const AsyncComponet = (props: asyncInterface) => {
  const {
    setCurrentPlayer,
    enemyBoardData,
    currentPlayer,
    boardData,
    shipData,
    dispatch,
    setBoard,
    state,
    shipsData,
    setShip
  } = props;

  useEffect(() => {
    const { UpdateArrayMethod } = updateMethod;

    const selectedBoats = state.selectedShipOptions.setBoats;

    const droppedShips = state.droppedPlayerShips;

    if (selectedBoats.length) return;
    const alreadyInUse = droppedShips.map((el) => el.name);

    const correctShips = shipsData.filter(
      (el) => !alreadyInUse.includes(el.name)
    );

    const selectedBoat = state.droppedPlayerShips;
    const findShip = selectedBoat.map((el) => el.name);
    const correct = shipsData.filter((el) => findShip.includes(el.name));

    const update = UpdateArrayMethod(
      selectedBoat,
      boardData,
      correct,
      droppedShips as any
    );

    if (service.boardMoved(boardData, update as any)) setBoard(update as any);

    if (service.boardMoved(shipData as any, correctShips as any))
      setShip(correctShips);
  }, [boardData, setBoard, setShip, shipData, shipsData, state]);

  useEffect(() => {
    const { UpdateArrayMethod } = updateMethod;

    const selectedBoats = state.selectedShipOptions.setBoats;
    if (!selectedBoats.length) return;

    const uniqueShipsOptions =
      state.selectedShipOptions.updateCurrentMove.filter(
        (el) => el.length === selectedBoats.length
      );

    const selectedBoat = state.selectedShipOptions.setBoats;

    const findShip = selectedBoat.map((el) => el.name);

    const uniqiueName = uniqueShipsOptions.map((el) => el.name);

    const correctShips = selectedBoats.length
      ? shipsData
      : shipsData.filter((el) => findShip.includes(el.name));

    const shipPanel = uniqueShipsOptions.length
      ? shipsData.filter(
          (el) => ![...uniqiueName, ...findShip].includes(el.name)
        )
      : shipsData.filter((el) => !findShip.includes(el.name));

    const update = UpdateArrayMethod(
      selectedBoat,
      boardData,
      correctShips,
      uniqueShipsOptions
    );

    if (service.boardMoved(boardData, update as any)) {
      setBoard(update as any);
      setShip(shipPanel);
    }
  }, [boardData, setBoard, setShip, shipData, shipsData, state]);

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

    if (allShipsInOnePlace === MAX_SHIP_SIZE) {
      dispatch({ type: Types.Off, payload: { buttonStatus: true } });
      return;
    } else dispatch({ type: Types.On, payload: { buttonStatus: false } });
  }, [shipData, dispatch, boardData]);

  useEffect(() => {
    EnemyShipDestroyer(
      enemyBoardData,
      state,
      (callback: arrInterface[] | undefined) =>
        dispatch({
          type: Types.Set_Player_Destroyed_Boats,
          payload: { player: callback }
        })
    );
  }, [enemyBoardData, dispatch, state]);

  useEffect(() => {
    const noMoves = boardData.filter((el) => el.attack !== true).length;
    if (noMoves <= 1) return;
    if (currentPlayer === "right") return;
    setCurrentPlayer("right");

    AiShipDestroyer(boardData, setBoard, state, (callback) =>
      dispatch({
        type: Types.Set_Ai_Destroyed_Boats,
        payload: { ai: callback }
      })
    );
  }, [boardData, setBoard, currentPlayer, state, dispatch, setCurrentPlayer]);
};

export default AsyncComponet;
