import React, {
  useState,
  useContext,
  Fragment,
  memo,
  useCallback,
  Suspense
} from "react";

import { DragAndDropShip, PlayerDragAndDrop } from "../service/dragAndDrop";
import { Section, Rotate, FooterSlicer } from "../css/game.style";
import { AppContext } from "../store/store";
import { Types } from "../store/types";

import GenerateEnemyBoard from "../service/boardCreator/enemyBoard";
import GenerateBoard from "../service/boardCreator/board";
import ShipPanel from "../service/ships/shipPanel";
import Enemy from "../service/ai/EnemyCreator";
import AsyncComponet from "../service/async";
import { isEqual } from "lodash";
import { GameOverPanel } from "../components/index";

const Ships = React.lazy(() => import("../components/Ships/Ships"));
const SideMenu = React.lazy(() => import("../components/sideMenu/SideMenu"));
const FooterMenu = React.lazy(
  () => import("../components/footerMenu/FooterMenu")
);
const FooterAttack = React.lazy(
  () => import("../components/footerMenu/FooterAttack")
);
const FooterHistory = React.lazy(
  () => import("../components/footerMenu/FooterHistory")
);
const PlayerBoard = React.lazy(
  () => import("../components/PlayerBoard/PlayerBoard")
);
const ComputerGame = React.lazy(
  () => import("../components/computer/computerGame")
);

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
    setCurrentPlayer,
    setEnemyBoard
  };

  const { handleDragStartShip, handleDropShip, handleRotateShip } =
    DragAndDropShip(state.rotateShip, dispatch);

  const { handleDragOver, handleDropPlayer, handleMouseOver } =
    PlayerDragAndDrop({ ...PROPS });

  AsyncComponet({ ...PROPS });

  const generate = Enemy(shipsData, enemyBoardData, setEnemyBoard);

  const handleStartGame = () => {
    generate();
    dispatch({ type: Types.Set_Game_On, payload: true });
  };

  const handleShipAttack = useCallback(
    (id: number) => {
      if (currentPlayer === "left") return;

      const findFire = enemyBoardData.find((el) => el.id === id);
      const findShips = enemyBoardData
        .filter((el) => el.used === true)
        .map((_, i) => i).length;

      if (!findFire || !findShips || findFire?.attack) return;

      const update = enemyBoardData.map((el) => {
        if (el.id === findFire.id) return { ...el, attack: true, miss: true };
        if (el.name === findFire.name)
          return { ...el, attacked: [...el.attacked, findFire.id] };

        if (el.name === "enemy") return { ...el, miss: true };
        if (el.name !== "enemy") return { ...el, miss: false };
        return el;
      });

      setCurrentPlayer("left");
      setEnemyBoard(update);
    },
    [currentPlayer, enemyBoardData, setEnemyBoard]
  );

  const ShipsProps = {
    ...PROPS,
    handleDragOver,
    handleDragStartShip,
    handleDropShip,
    handleRotateShip,
    handleMouseOver,
    handleStartGame
  };

  const winner = state.gameOver;

  return winner ? (
    <GameOverPanel shipsData={shipsData} enemyBoardData={enemyBoardData} />
  ) : (
    <Fragment>
      <Suspense fallback={<div>loading side menu...</div>}>
        <SideMenu />
      </Suspense>
      <Suspense fallback={<div>loading footer menu...</div>}>
        <FooterSlicer>
          <FooterMenu props={ShipsProps} />
          <FooterHistory props={ShipsProps} />
          <FooterAttack
            props={ShipsProps}
            handleShipAttack={handleShipAttack}
          />
        </FooterSlicer>
      </Suspense>
      <Section>
        <Rotate>
          <Suspense fallback={<div>loading boards...</div>}>
            <PlayerBoard
              state={state}
              boardData={boardData}
              handleDragOver={handleDragOver}
              handleDropPlayer={handleDropPlayer}
            />
            <ComputerGame
              shipData={enemyBoardData}
              handleShipAttack={handleShipAttack}
            />
          </Suspense>
        </Rotate>
        <Suspense fallback={<div>loading ships...</div>}>
          <Ships props={ShipsProps} />
        </Suspense>
      </Section>
    </Fragment>
  );
};

export default memo(Game, isEqual);
