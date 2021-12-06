import { InitialStateType } from "../../../store/interface/index";
import { mapInterface } from "../../boardCreator/interface/index";
import { shipInterface } from "../../ships/interface/index";
import { actionsPayload } from "../../../store/interface";

export interface asyncInterface {
  state: InitialStateType;
  dispatch: React.Dispatch<actionsPayload>;
  boardData: mapInterface[];
  shipData: shipInterface[];
  enemyBoardData: mapInterface[];
  currentPlayer: string;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>;
  setBoard: React.Dispatch<React.SetStateAction<mapInterface[]>>;
  setShip: React.Dispatch<React.SetStateAction<shipInterface[]>>;
  shipsData: shipInterface[];
}
