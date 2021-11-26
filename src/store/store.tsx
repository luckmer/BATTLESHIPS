import React, { createContext, useReducer, Dispatch } from "react";
import { InitialStateType, actionsPayload } from "./interface";
import {
  gameDisplayPanel,
  moveStatusPanel,
  rotateShipPanel,
  rotatePanel,
  shipKey
} from "./reducers/index";

const initialState = {
  rotateShip: [],
  dragged: false,
  buttonStatus: false,
  rotateStatus: false,
  uniqueShipKey: 0,
  moveStatus: {
    status: false,
    response: ""
  }
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<actionsPayload>;
}>({
  state: initialState,
  dispatch: () => null
});

const reducer = (state: InitialStateType, action: any) => ({
  buttonStatus: gameDisplayPanel(state, action),
  moveStatus: moveStatusPanel(state, action),
  rotateShip: rotateShipPanel(state, action),
  rotateStatus: rotatePanel(state, action),
  uniqueShipKey: shipKey()
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
