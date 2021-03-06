import {
  Fragment,
  useState,
  useContext,
  useEffect,
  memo,
  useCallback,
  useMemo
} from "react";
import { GameDiv, GameButton, Button } from "../../css/game.style";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AppContext } from "../../store/store";
import { Types } from "../../store/types";
import * as Side from "../css/sideMenu.style";

const SideMenu = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const { state, dispatch } = useContext(AppContext);
  const selectedBoat = state.selectedShipOptions.setBoats;
  const gameOn = state.gameStatus;

  const droppedBoats = state.droppedPlayerShips.map((el, i) => {
    return { ...el, slice: ~~(i + 1) };
  });

  const handleClick = useCallback(() => {
    !gameOn && setOpenSideMenu(!openSideMenu);
  }, [gameOn, openSideMenu]);

  const handleSetupOption = useCallback(
    (slicer: number) => {
      const selectedOption = droppedBoats.slice(0, slicer);

      dispatch({
        type: Types.Set_Selected_Boats,
        payload: { setBoats: selectedOption }
      });
    },
    [dispatch, droppedBoats]
  );

  const handleUnClickMove = useCallback(() => {
    selectedBoat.length &&
      dispatch({ type: Types.Set_Selected_Boats, payload: { setBoats: [] } });
  }, [dispatch, selectedBoat]);

  useEffect(
    () => setOpenSideMenu(() => (gameOn ? false : openSideMenu)),
    [gameOn, openSideMenu]
  );

  const moveMove = state.selectedShipOptions.setBoats;

  const Memo = useMemo(() => droppedBoats, [droppedBoats]);

  return (
    <Fragment>
      <Side.SideMenuPanel open={openSideMenu} gameOn={gameOn}>
        <Side.SideButtons>
          <Side.Header>
            <h1>Moves</h1>
          </Side.Header>
          <GameDiv>
            <GameButton onClick={() => handleClick()}>
              <Button>Close</Button>
            </GameButton>
          </GameDiv>
        </Side.SideButtons>
        <Side.DroppedShipContainer>
          {Memo.map((el, i) => (
            <Side.DroppedBox
              key={i}
              onClick={() => handleSetupOption(el.slice)}
            >
              <div>
                <p>{el.name}</p>
              </div>
              <Side.DivBox>
                <p>{el.slice}</p>
                <small>boats</small>
              </Side.DivBox>
            </Side.DroppedBox>
          ))}
        </Side.DroppedShipContainer>
        <Side.SideDiv>
          {moveMove.length > 0 && (
            <GameButton onClick={handleUnClickMove}>
              <Button>unclick move</Button>
            </GameButton>
          )}
        </Side.SideDiv>
      </Side.SideMenuPanel>
      <Side.Section gameOn={gameOn}>
        <Side.Clicker onClick={handleClick}>
          <p>History</p>
          <AiOutlineArrowRight />
        </Side.Clicker>
      </Side.Section>
    </Fragment>
  );
};

export default memo(SideMenu);
