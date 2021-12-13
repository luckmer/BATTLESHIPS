import { useEffect, useContext } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { PropsInterface } from "./interface/arrInterface";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../../store/store";
import { Types } from "../../store/types";
import ObjData from "./service/index";

const boardMoved = (original: string[], updated: string[]) =>
  JSON.stringify(updated) !== JSON.stringify(original);

const NoteInformation = (props: PropsInterface) => {
  const { state, dispatch } = useContext(AppContext);

  const { notification, destroyedBoats } = props;
  const { player, ai } = destroyedBoats;

  const response = notification.response;

  useEffect(() => {
    const { obj, lives } = ObjData(ai);

    for (let key in obj) {
      const char = lives[key];

      if (char === obj[key]) {
        if (!state.boatHits.includes(key)) {
          toast.warn(`the enemy sunk your ${key} `);

          if (boardMoved([key], state.boatHits)) {
            dispatch({ type: Types.Enemy_Sunk_Ship, payload: key });
          }
        }
      }
    }

    if (state.boatHits.length === 5)
      dispatch({ type: Types.Set_Game_Over, payload: { player: "ai" } });
  }, [ai, dispatch, state]);

  useEffect(() => {
    const { obj, lives } = ObjData(player);

    for (let key in obj) {
      const char = lives[key];

      if (char === obj[key]) {
        if (!state.playerBoatHits.includes(key)) {
          toast.success(`You sunk the ${key} `);
          if (boardMoved([key], state.playerBoatHits)) {
            dispatch({ type: Types.Player_Sunk_Ship, payload: key });
          }
        }
      }
    }

    if (state.playerBoatHits.length === 5)
      dispatch({ type: Types.Set_Game_Over, payload: { player: "player" } });
  }, [player, dispatch, state]);

  useEffect(() => {
    if (!response) return;
    if (typeof window !== "undefined") injectStyle();
    toast.dark(response);
  }, [response]);

  return <ToastContainer limit={2} />;
};

export default NoteInformation;
