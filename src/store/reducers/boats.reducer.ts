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

export const setUserDroppedShips = (
  state: InitialStateType,
  action: actionsPayload
) => {
  switch (action.type) {
    case Types.Save_Dropped_Boards:
      return [...state.droppedPlayerShips, action.payload];
    default:
      return state.droppedPlayerShips;
  }
};

export const setupSelectedOptions = (
  state: InitialStateType,
  action: actionsPayload
) => {
  switch (action.type) {
    case Types.Set_Selected_Boats:
      return {
        ...state.selectedShipOptions,
        setBoats: action.payload.setBoats
      };

    case Types.Set_Unclick_Boats:
      return { ...state.selectedShipOptions, setBoats: [] };

    case Types.Set_Update_Curent_Move:
      return {
        ...state.selectedShipOptions,
        updateCurrentMove: [
          ...state.selectedShipOptions.updateCurrentMove,
          action.payload.updateCurrentMove
        ]
      };

    default:
      return state.selectedShipOptions;
  }
};
