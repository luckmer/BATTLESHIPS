import { InitialStateType } from "../interface/index";
import { actionsPayload } from "../interface";
import { Types } from "../types";

export const moveStatusPanel = (
  state: InitialStateType,
  action: actionsPayload
) => {
  switch (action.type) {
    case Types.Correct_status:
      return {
        status: true,
        response: action.payload.response
      };

    case Types.Incorrect_status:
      return {
        status: false,
        response: action.payload.response
      };

    default:
      return state.moveStatus;
  }
};

export const rotateShipPanel = (
  state: InitialStateType,
  action: actionsPayload
) => {
  return state.rotateShip;
};

export const rotatePanel = (
  state: InitialStateType,
  action: actionsPayload
) => {
  switch (action.type) {
    case Types.Rotate_on:
      return action.payload.status;
    case Types.Rotate_off:
      return action.payload.status;
    default:
      return state.rotateStatus;
  }
};

export const gameDisplayPanel = (
  state: InitialStateType,
  action: actionsPayload
) => {
  switch (action.type) {
    case Types.On:
      return false;
    case Types.Off:
      return true;
    default:
      return state.buttonStatus;
  }
};

export const shipKey = () => {
  return 0;
};
