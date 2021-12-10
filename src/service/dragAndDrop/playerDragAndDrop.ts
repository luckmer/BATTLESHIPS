import { InitialStateType, actionsPayload } from "../../store/interface";
import { mapInterface } from "../boardCreator/interface";
import { shipInterface } from "../ships/interface";
import shipFunctions from "../ships/shipFunctions";
import { Types } from "../../store/types";
import service from "../gameService/Index";

interface PropsInterface {
  dispatch: React.Dispatch<actionsPayload>;
  shipData: shipInterface[];
  boardData: mapInterface[];
  setBoard: React.Dispatch<React.SetStateAction<mapInterface[]>>;
  setShip: React.Dispatch<React.SetStateAction<shipInterface[]>>;
  state: InitialStateType;
}

const PlayerDragAndDrop = (props: PropsInterface) => {
  const { dispatch, shipData, boardData, setBoard, setShip, state } = props;

  const rotateStatus = state.rotateStatus;
  const rotateShip = state.rotateShip;
  const uniqueShipKey = state.uniqueShipKey;
  const dragged = state.dragged;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropPlayer = (e: React.DragEvent<HTMLDivElement>) => {
    const { shipPanel, ShipCollisionBlocker, BlockShip } = shipFunctions;
    const target = e.target as HTMLDivElement;
    const droppedShip = e.dataTransfer.getData("id");
    const ID = Number(target.id);
    const shipID = uniqueShipKey;
    const selectedMove = state.selectedShipOptions.setBoats;

    dispatch({ type: Types.Set_Dragged_Status, payload: { dragged: false } });

    let ship = shipData!.find(
      ({ name }: { name: string }) => name === droppedShip
    );

    if (!ship) return;

    const shipLocation = shipPanel(ship, shipID, ID, rotateShip, rotateStatus);

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

    const update = service.Response(
      boardData,
      shipLocation,
      ship,
      rotateStatus
    );

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

    dispatch({ type: Types.Rotate_Ship_Off, payload: { ship: ship!.name } });
    dispatch({ type: Types.Rotate_off, payload: { status: false } });

    setShip(deleteShip);
  };

  const handleMouseOver = (el: number) => {
    if (dragged) return;
    dispatch({ type: Types.Set_Ship_key, payload: { id: el } });
  };

  return { handleDragOver, handleDropPlayer, handleMouseOver };
};

export default PlayerDragAndDrop;
