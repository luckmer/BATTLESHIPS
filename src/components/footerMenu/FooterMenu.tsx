import { Fragment, useState, useEffect } from "react";

import { CheckInterface, TextInterface } from "./interface/TextInterface";
import { shipsPropsInterface } from "../Ships/interface";
import { HeaderCreator } from "./service/HeaderCreator";
import { boardsInterface } from "../../pages/interface";
import { Ship, ShipGrid } from "../../css/game.style";
import { AiOutlineArrowUp } from "react-icons/ai";
import { FormPanel } from "./service/FormPanel";
import { Types } from "../../store/types";
import { ButtonPanel } from "..";

import shipFunctions from "../../service/ships/shipFunctions";
import WindowEditor from "../../hooks/WindowEditor.hook";
import service from "../../service/gameService/Index";
import FooterPanel from "./FooterPanel";
import {
  FooterSection,
  ShipsContainer,
  ShipsDisplayContainer,
  RotationContainer,
  CheckBox
} from "../css/FooterMenu.style";

const FooterMenu = ({ props }: { props: shipsPropsInterface }) => {
  const [openSiteMenu, setOpenSiteMenu] = useState<boolean>(false);
  const [selectedShip, setSelectedShip] = useState("");
  const [text, setText] = useState<TextInterface>({
    vertical: "",
    horizontal: ""
  });
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<CheckInterface[]>(
    []
  );
  const [width, height] = WindowEditor();
  const { dispatch, shipData, boardData, setBoard, setShip, state } = props;
  const selectedMove = state.selectedShipOptions.setBoats;

  const handleTouchStart = () => setOpenSiteMenu(() => !openSiteMenu);

  const handleSelectOnlyOneBoat = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const ids = target.id;

    if (ids === selectedShip) setSelectedShip("");
    else setSelectedShip(ids);
  };

  useEffect(
    () => setOpenSiteMenu(width >= 772 ? false : openSiteMenu),
    [openSiteMenu, width]
  );

  const handleCheckboxChange = (data: { value: string }) => {
    const isChecked = checkedCheckboxes.some(
      ({ value }: { value: string }) => value === data.value
    );
    if (isChecked) {
      setCheckedCheckboxes(
        checkedCheckboxes.filter(
          ({ value }: { value: string }) => value !== data.value
        )
      );
    } else setCheckedCheckboxes((prev) => prev.concat(data));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { shipPanel, ShipCollisionBlocker, BlockShip } = shipFunctions;

    const correctAlphabet = new Array(10)
      .fill(1)
      .map((_, i) => String.fromCharCode(65 + i).toLocaleLowerCase());

    const correctNumbers = new Array(10).fill(1).map((_, i) => i + 1);

    const horizontal = text.horizontal;
    const vertical = Number(text.vertical);

    if (
      !horizontal &&
      !correctAlphabet.includes(horizontal) &&
      !vertical &&
      !correctNumbers.includes(vertical)
    ) {
      dispatch({
        type: Types.Correct_status,
        payload: {
          status: true,
          response: "please complete the required fields "
        }
      });
      return;
    }

    const findCorrectLocation = boardData.find(
      (el) =>
        el.location === vertical &&
        el.placer.toString() === horizontal.toString()
    );

    if (!findCorrectLocation) return;

    let ship = shipData!.find(
      ({ name }: { name: string }) => name === selectedShip
    );

    if (!ship) return;

    // const rotateData = checkedCheckboxes.filter((el) => el.value === "rotate");

    // const rotateStatus = rotateData.length ? true : false;
    const rotateShip = false ? [selectedShip] : [];

    const ID = findCorrectLocation.id;

    const shipLocation = shipPanel(ship, 1, ID, rotateShip, false);

    const shipBlocker = BlockShip(shipLocation, boardData);

    dispatch({
      type: Types.Correct_status,
      payload: {
        status: true,
        response: shipBlocker
          ? "success"
          : "you couldn't put the boat in the water"
      }
    });

    if (!shipBlocker) return;

    const update = service.Response(boardData, shipLocation, ship);

    setBoard(update);

    const alreadyInUse = ShipCollisionBlocker(boardData, shipLocation);

    if (alreadyInUse) return;

    const deleteShip = shipData.filter((el) => el.name !== ship!.name);

    if (selectedMove.length) {
      const length: number = selectedMove.length;
      const name: string = ship.name as string;

      const data = { name: name, position: shipLocation, length: length };

      dispatch({
        type: Types.Set_Update_Curent_Move,
        payload: { updateCurrentMove: { ...data } }
      });
    }

    if (!selectedMove.length) {
      dispatch({
        type: Types.Save_Dropped_Boards,
        payload: { name: ship.name, position: shipLocation }
      });
    }

    setShip(deleteShip);
    setSelectedShip("");
    setText({ vertical: "", horizontal: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    setText({ ...text, [target.name]: target.value });
  };

  const receivedData = [{ value: "horizontal" }, { value: "vertical" }];
  const arrowUp = <AiOutlineArrowUp />;
  const data = { value: "rotate" };
  const PROPS = {
    handleSubmit,
    receivedData,
    checkedCheckboxes,
    handleCheckboxChange,
    text,
    handleChange
  };

  return (
    <Fragment>
      {FooterPanel(handleTouchStart, openSiteMenu, height, arrowUp)}
      <FooterSection openSiteMenu={openSiteMenu} height={height}>
        <div>
          <ShipsContainer>
            <HeaderCreator name="Ships" />
            <ShipsDisplayContainer>
              {shipData.map(({ id, size, name }: boardsInterface) => {
                const findShip = name === selectedShip;
                const rotateBlocker = props.state.rotateStatus && findShip;

                const shipBlocks = new Array(size)
                  .fill(1)
                  .map((el: number, i) => {
                    return { name: name, id: el + i };
                  });

                return (
                  <ShipGrid status={rotateBlocker} key={id} size={size}>
                    <Ship
                      size={size}
                      status={rotateBlocker}
                      setupColor={findShip}
                      id={name}
                    >
                      {shipBlocks.map((data: { name: string; id: number }) => (
                        <div
                          key={data.id}
                          onClick={(e) => handleSelectOnlyOneBoat(e)}
                          id={String(data.name)}
                        />
                      ))}
                    </Ship>
                  </ShipGrid>
                );
              })}
            </ShipsDisplayContainer>
          </ShipsContainer>
          <RotationContainer>
            <HeaderCreator name="rotation" />
            <CheckBox>
              <input
                id={data.value}
                value={data.value}
                type="checkbox"
                checked={checkedCheckboxes.some(
                  ({ value }: { value: string }) => value === data.value
                )}
                onChange={() => handleCheckboxChange(data)}
              />
              <label htmlFor={data.value}>{data.value}</label>
            </CheckBox>
          </RotationContainer>
          <div>
            <HeaderCreator name="launching panel" />
            <FormPanel props={PROPS} />
          </div>
        </div>
        {!state.gameStatus && state.buttonStatus && (
          <ButtonPanel handleStartGame={props.handleStartGame} />
        )}
      </FooterSection>
    </Fragment>
  );
};

export default FooterMenu;
