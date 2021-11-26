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

type typesPayload = {
  [Types.Incorrect_status]: dropStatus;
  [Types.Correct_status]: dropStatus;
  [Types.Rotate_off]: Status;
  [Types.Rotate_on]: Status;
  [Types.Drag_off]: Status;
  [Types.Drag_on]: Status;
  [Types.Off]: Status;
  [Types.On]: Status;
};

export type InitialStateType = {
  status: boolean;
  moveStatus: {
    status: boolean;
    response: string;
  };
  rotateStatus: boolean;
  rotateShip: string[];
  uniqueShipKey: number;
};

export type actionsPayload =
  ActionMap<typesPayload>[keyof ActionMap<typesPayload>];
