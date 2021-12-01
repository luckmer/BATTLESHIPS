import { InitialStateType, actionsPayload } from "../interface";
import { Types } from "../types";

export const setDestroyedBoats = (
  state: InitialStateType,
  action: actionsPayload
) => {
  switch (action.type) {
    case Types.Set_Ai_Destroyed_Boats:
      return { ...state.destroyedBoats, ai: action.payload.ai };
    case Types.Set_Player_Destroyed_Boats:
      return { ...state.destroyedBoats, player: action.payload.player };

    default:
      return state.destroyedBoats;
  }
};

export const setGameStatus = (
  state: InitialStateType,
  action: actionsPayload
) => {
  switch (action.type) {
    case Types.Set_Game_Over:
      return action.payload.player;
    default:
      return state.gameOver;
  }
};
