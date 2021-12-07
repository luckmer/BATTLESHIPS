import { Fragment, useState, useContext, useEffect } from "react";
import { GameDiv, GameButton, Button } from "../../css/game.style";
import { boardsInterface } from "../../pages/interface";
import { ShipGrid, Ship } from "../../css/game.style";
import { AiOutlineArrowRight } from "react-icons/ai";
import { shipsPropsInterface } from "./interface";
import { AppContext } from "../../store/store";
import { ButtonPanel } from "../index";

import * as Dec from "../css/ships.style";

const Ships = ({ props }: { props: shipsPropsInterface }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const { shipData, handleStartGame } = props;
  const { state } = useContext(AppContext);
  const gameOn = state.gameStatus;

  const handleClick = () => !gameOn && setOpenSideMenu(!openSideMenu);

  useEffect(
    () => setOpenSideMenu(() => (gameOn ? false : openSideMenu)),
    [gameOn, openSideMenu]
  );

  return (
    <Fragment>
      <Dec.SideShipPanel open={openSideMenu} gameOn={gameOn}>
        <Dec.SidePanel>
          <Dec.Header>
            <h1>SHIPS</h1>
            <GameDiv>
              <GameButton onClick={handleClick}>
                <Button>Close</Button>
              </GameButton>
            </GameDiv>
          </Dec.Header>
        </Dec.SidePanel>
        <div>
          {!state.gameStatus && state.buttonStatus && (
            <ButtonPanel handleStartGame={handleStartGame} />
          )}
        </div>
        <Dec.SideContainer>
          <div>
            {shipData.map(({ id, size, name }: boardsInterface) => {
              const findShip = props.state.rotateShip.some(
                (el: string) => el === name
              );
              const rotateBlocker = props.state.rotateStatus && findShip;

              const shipBlocks = new Array(size)
                .fill(1)
                .map((el: number, i) => {
                  return { name: name, id: el + i };
                });

              return (
                <ShipGrid status={rotateBlocker} key={id} size={size}>
                  <Ship
                    draggable
                    onDragOver={(e) => props.handleDragOver(e)}
                    onDragStart={(e) => props.handleDragStartShip(e)}
                    onDrop={(e) => props.handleDropShip(e)}
                    size={size}
                    status={rotateBlocker}
                    setupColor={findShip}
                    id={name}
                  >
                    {shipBlocks.map((data: { name: string; id: number }) => (
                      <div
                        key={data.id}
                        onClick={(e) => props.handleRotateShip(e)}
                        id={String(data.name)}
                        onMouseOver={() => props.handleMouseOver(data.id)}
                      />
                    ))}
                  </Ship>
                </ShipGrid>
              );
            })}
          </div>
        </Dec.SideContainer>
      </Dec.SideShipPanel>
      <Dec.Section gameOn={gameOn}>
        <Dec.Clicker onClick={handleClick}>
          <p>Ships</p>
          <AiOutlineArrowRight />
        </Dec.Clicker>
      </Dec.Section>
    </Fragment>
  );
};

export default Ships;
