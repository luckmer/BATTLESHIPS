import { actionsPayload } from "../../store/interface";
import { Types } from "../../store/types";

const DragAndDropShip = (
  rotateShip: string[],
  dispatch: React.Dispatch<actionsPayload>
) => {
  const handleRotateShip = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;

    const id = target.id;

    if (rotateShip.includes(id)) {
      dispatch({ type: Types.Rotate_Ship_Off, payload: { ship: id } });
    } else dispatch({ type: Types.Rotate_Ship_On, payload: { ship: id } });
  };

  const handleDragStartShip = (e: React.DragEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLDivElement).id;
    e.dataTransfer.setData("id", target);

    dispatch({ type: Types.Set_Dragged_Status, payload: { dragged: true } });
  };

  const handleDropShip = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch({ type: Types.Set_Dragged_Status, payload: { dragged: false } });
  };

  return { handleDragStartShip, handleDropShip, handleRotateShip };
};

export default DragAndDropShip;
