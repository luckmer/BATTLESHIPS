import { shipInterface } from "./../../service/ships/interface/index";
import { Types } from "../types/index";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type dropStatus = {
  status: boolean;
  response: string;
};

type Status = {
  status: boolean;
};

type droppedShipInterface = {
  name: string;
  position: number[];
}[];

type droppedShipPanel = {
  name: string;
  position: number[];
};

type typesPayload = {
  [Types.Incorrect_status]: dropStatus;
  [Types.Correct_status]: dropStatus;
  [Types.Rotate_off]: Status;
  [Types.Rotate_on]: Status;
  [Types.Drag_off]: Status;
  [Types.Drag_on]: Status;
  [Types.Set_Game_Over]: { player: string };
  [Types.Set_Ship_key]: { id: number };
  [Types.Rotate_Ship_On]: { ship: string };
  [Types.Rotate_Ship_Off]: { ship: string };
  [Types.Off]: { buttonStatus: boolean };
  [Types.On]: { buttonStatus: boolean };
  [Types.Set_Dragged_Status]: { dragged: boolean };
  [Types.Set_Player_Destroyed_Boats]: { player: arrInterface[] | undefined };
  [Types.Set_Game_Off]: boolean;
  [Types.Set_Game_On]: boolean;
  [Types.Save_Dropped_Boards]: droppedShipPanel;
  [Types.Set_Ai_Destroyed_Boats]: { ai: arrInterface[] | undefined };
  [Types.Set_Selected_Boats]: { setBoats: droppedShipInterface };
  [Types.Set_Unclick_Boats]: { setBoats: [] };
  [Types.Set_Update_Curent_Move]: {
    updateCurrentMove: {
      name: shipInterface | string | any;
      position: number[];
      length: number;
    };
  };
};

export type InitialStateType = {
  gameStatus: boolean;
  buttonStatus: boolean;
  moveStatus: { status: boolean; response: string };
  destroyedBoats: {
    player: arrInterface[] | undefined;
    ai: arrInterface[] | undefined;
  };
  rotateStatus: boolean;
  rotateShip: string[];
  uniqueShipKey: number;
  dragged: boolean;
  gameOver: string;
  droppedPlayerShips: droppedShipInterface;
  selectedShipOptions: {
    setBoats: droppedShipInterface;
    updateCurrentMove: {
      name: shipInterface;
      position: number[];
      length: any;
    }[];
  };
  boatHits: number[];
};

interface arrInterface {
  attacked: number[];
  name: string;
  size: string | number;
}

export type actionsPayload =
  ActionMap<typesPayload>[keyof ActionMap<typesPayload>];
