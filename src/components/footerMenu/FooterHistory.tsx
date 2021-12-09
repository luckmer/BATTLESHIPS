import { Fragment, useState } from "react";

import WindowEditor from "../../hooks/WindowEditor.hook";
import FooterPanel from "./FooterPanel";

import { shipsPropsInterface } from "../Ships/interface";
import { FooterSection } from "../css/FooterMenu.style";
import { AiOutlineArrowUp } from "react-icons/ai";
import { Types } from "../../store/types";
import {
  SideShipContainer,
  SideShipContent,
  ButtonSection,
  Button
} from "../css/FooterHistory.style";

const FooterHistory = ({ props }: { props: shipsPropsInterface }) => {
  const [, height] = WindowEditor();
  const [openSiteMenu, setOpenSiteMenu] = useState(false);
  const { state, dispatch } = props;
  const selectedBoat = state.selectedShipOptions.setBoats;

  const droppedBoats = state.droppedPlayerShips.map((el, i) => {
    return { ...el, slice: ~~(i + 1) };
  });

  const handleTouchStart = () => setOpenSiteMenu(() => !openSiteMenu);

  const handleSetupOption = (slicer: number) => {
    const selectedOption = droppedBoats.slice(0, slicer);

    dispatch({
      type: Types.Set_Selected_Boats,
      payload: { setBoats: selectedOption }
    });
  };

  const handleUnClickMove = () =>
    selectedBoat.length &&
    dispatch({ type: Types.Set_Selected_Boats, payload: { setBoats: [] } });

  const arrowUp = <AiOutlineArrowUp />;

  const moveMove = state.selectedShipOptions.setBoats;

  return (
    <Fragment>
      {FooterPanel(handleTouchStart, openSiteMenu, height, arrowUp)}
      <FooterSection openSiteMenu={openSiteMenu} height={height}>
        <SideShipContainer>
          {droppedBoats.length ? (
            droppedBoats.map((el, i) => (
              <SideShipContent
                setupColor={moveMove.length === el.slice}
                key={i}
                onClick={() => handleSetupOption(el.slice)}
              >
                <div>
                  <p>{el.name}</p>
                </div>
                <div>
                  <p>{el.slice}</p>
                  <small>boats</small>
                </div>
              </SideShipContent>
            ))
          ) : (
            <div>
              <h1>
                no movement history to select , please put the ship in the water
              </h1>
            </div>
          )}
          {moveMove.length > 0 && (
            <ButtonSection onClick={handleUnClickMove}>
              <Button>unclick move</Button>
            </ButtonSection>
          )}
        </SideShipContainer>
      </FooterSection>
    </Fragment>
  );
};

export default FooterHistory;
