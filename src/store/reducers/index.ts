import { actionsPayload } from "../interface";
import { Types } from "../types";

export const moveStatusPanel = (action: actionsPayload) => {
  switch (action.type) {
    case Types.Correct_status:
      return {
        status: action.payload.status,
        response: action.payload.response
      };

    case Types.Incorrect_status:
      return {
        status: action.payload.status,
        response: action.payload.response
      };

    default:
      return { status: false, response: "" };
  }
};

export const rotateShipPanel = (action: actionsPayload) => {
  return [];
};

export const rotatePanel = (action: actionsPayload) => {
  switch (action.type) {
    case Types.Rotate_on:
      return action.payload.status;
    case Types.Rotate_off:
      return action.payload.status;
    default:
      return false;
  }
};

export const gameDisplayPanel = (action: actionsPayload) => {
  switch (action.type) {
    case Types.On:
      return true;
    case Types.Off:
      return false;
    default:
      return false;
  }
};

export const shipKey = () => {
  return 0;
};
