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
  status: false,
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
  status: gameDisplayPanel(action),
  moveStatus: moveStatusPanel(action),
  rotateShip: rotateShipPanel(action),
  rotateStatus: rotatePanel(action),
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
