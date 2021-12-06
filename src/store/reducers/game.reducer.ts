import { InitialStateType, actionsPayload } from "../interface";
import { Types } from "../types";

export const setGameOn = (state: InitialStateType, action: actionsPayload) => {
  switch (action.type) {
    case Types.Set_Game_On:
      return action.payload;
    case Types.Set_Game_Off:
      return action.payload;
    default:
      return state.gameStatus;
  }
};
