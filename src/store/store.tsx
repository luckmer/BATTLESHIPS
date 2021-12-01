import React, { createContext, useReducer, Dispatch } from "react";
import { InitialStateType, actionsPayload } from "./interface";

import { setDestroyedBoats, setGameStatus } from "./reducers/boats.reducer";
import {
  gameDisplayPanel,
  moveStatusPanel,
  rotateShipPanel,
  rotatePanel,
  shipKey,
  draggedPanel
} from "./reducers/index.reducer";

const initialState = {
  rotateShip: [],
  dragged: false,
  buttonStatus: false,
  rotateStatus: false,
  uniqueShipKey: 0,
  moveStatus: { status: false, response: "" },
  destroyedBoats: { player: [], ai: [] },
  gameOver: ""
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<actionsPayload>;
}>({
  state: initialState,
  dispatch: () => null
});

const reducer = (state: InitialStateType, action: any) => ({
  destroyedBoats: setDestroyedBoats(state, action),
  buttonStatus: gameDisplayPanel(state, action),
  moveStatus: moveStatusPanel(state, action),
  rotateShip: rotateShipPanel(state, action),
  rotateStatus: rotatePanel(state, action),
  gameOver: setGameStatus(state, action),
  uniqueShipKey: shipKey(state, action),
  dragged: draggedPanel(state, action)
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
