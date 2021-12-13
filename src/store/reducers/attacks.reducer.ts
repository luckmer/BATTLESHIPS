import { Types } from "../types";
import { InitialStateType, actionsPayload } from "./../interface/index";
export const setupBoatHit = (
  state: InitialStateType,
  action: actionsPayload
) => {
  switch (action.type) {
    case Types.Enemy_Sunk_Ship:
      return [...state.boatHits, action.payload];

    default:
      return state.boatHits;
  }
};

export const setupPlayerBoatShip = (
  state: InitialStateType,
  action: actionsPayload
) => {
  switch (action.type) {
    case Types.Player_Sunk_Ship:
      return [...state.playerBoatHits, action.payload];

    default:
      return state.playerBoatHits;
  }
};
