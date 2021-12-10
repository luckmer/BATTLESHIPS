import { InitialStateType, actionsPayload } from "./../interface/index";
export const setupBoatHit = (
  state: InitialStateType,
  action: actionsPayload
) => {
  switch (action.type) {
    default:
      return state.boatHits;
  }
};
