import { shipInterface } from "../../../service/ships/interface";
import { InitialStateType } from "../../../store/interface";

export interface shipsPropsInterface {
  shipData: shipInterface[];
  state: InitialStateType;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragStartShip: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropShip: (e: React.DragEvent<HTMLDivElement>) => void;
  handleRotateShip: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseOver: (el: number) => void;
  handleStartGame: () => void;
}
