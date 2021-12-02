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

    const update = service.Response(boardData, shipLocation, ship);

    setBoard(update);

    const alreadyInUse = ShipCollisionBlocker(boardData, shipLocation);

    if (alreadyInUse) return;

    const deleteShip = shipData.filter((el) => el.name !== ship!.name);

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
