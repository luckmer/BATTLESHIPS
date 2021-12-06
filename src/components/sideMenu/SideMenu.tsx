import { Fragment, useState, useContext } from "react";

import { GameDiv, GameButton, Button } from "../../css/game.style";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AppContext } from "../../store/store";
import { Types } from "../../store/types";
import styled from "styled-components";

const SideMenu = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const selectedBoat = state.selectedShipOptions.setBoats;

  const droppedBoats = state.droppedPlayerShips.map((el, i) => {
    return { ...el, slice: ~~(i + 1) };
  });

  const handleClick = () => setOpenSideMenu(!openSideMenu);

  const handleSetupOption = (slicer: number) => {
    const selectedOption = droppedBoats.slice(0, slicer);
    dispatch({
      type: Types.Set_Selected_Boats,
      payload: {
        setBoats: selectedOption
      }
    });
  };

  const handleUnClickMove = () =>
    selectedBoat.length &&
    dispatch({ type: Types.Set_Selected_Boats, payload: { setBoats: [] } });

  return (
    <Fragment>
      <SideMenuPanel open={openSideMenu}>
        <SideButtons>
          <Header>
            <h1>Moves</h1>
          </Header>
          <GameDiv>
            <GameButton onClick={handleClick}>
              <Button>Close</Button>
            </GameButton>
          </GameDiv>
        </SideButtons>
        <DroppedShipContainer>
          {droppedBoats.map((el, i) => (
            <DroppedBox key={i} onClick={() => handleSetupOption(el.slice)}>
              <div>
                <p>{el.name}</p>
              </div>
              <DivBox>
                <p>{el.slice}</p>
                <small>boats</small>
              </DivBox>
            </DroppedBox>
          ))}
        </DroppedShipContainer>
        <div>
          <button onClick={handleUnClickMove}>unclick move</button>
        </div>
      </SideMenuPanel>
      <Section>
        <Clicker onClick={handleClick}>
          <AiOutlineArrowRight />
        </Clicker>
      </Section>
    </Fragment>
  );
};

export default SideMenu;

const DivBox = styled.div`
  display: flex;
  padding-top: 10px;
  align-items: center;
  justify-content: center;

  p,
  small {
    margin: 0 10px;
  }
`;

const DroppedBox = styled.div`
  border: none;
  width: 100%;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

  border-bottom: 1px solid #0868cf;
  transition: all 0.3s;
  &:active {
    box-shadow: none;
    border-bottom: 1px solid white;
  }
`;

const DroppedShipContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: column;
  width: 100%;
`;

const Section = styled.section`
  bottom: 20px;
  position: absolute;
`;

const Clicker = styled.div`
  width: 60px;
  height: 25px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #0868cf;
  transition: all 0.5s;
  &:hover {
    width: 65px;
  }
  padding-right: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: white;
  cursor: pointer;
`;

const SideMenuPanel = styled.section<{ open: boolean }>`
  position: absolute;
  height: 100%;
  width: 200px;
  transition: all 0.5s;
  left: ${({ open }) => (open ? "0" : "0")};
  background: #0868cf;
  z-index: 1000;
  padding-right: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SideButtons = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px 30px 10px;
`;
const Header = styled.header`
  text-align: center;
  padding: 10px 0 10px 0;
  color: #fff;
`;
