import { useEffect, useContext } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { PropsInterface } from "./interface/arrInterface";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../../store/store";
import { Types } from "../../store/types";

import boatDestructionDetection from "./service/index";

const NoteInformation = (props: PropsInterface) => {
  const { dispatch } = useContext(AppContext);

  const { notification, destroyedBoats } = props;
  const { player, ai } = destroyedBoats;

  const response = notification.response;

  useEffect(() => {
    const destroyedShip = boatDestructionDetection.generateChecker(ai);

    if (destroyedShip?.length) {
      if (typeof window !== "undefined") injectStyle();
      const sortedElement = destroyedShip.sort();
      const lastElement = sortedElement.slice(-1).shift()?.name;

      toast.warn(`the enemy sunk your ${lastElement}`);
    }

    if (destroyedShip?.length === 5)
      dispatch({ type: Types.Set_Game_Over, payload: { player: "ai" } });
  }, [ai, dispatch]);

  useEffect(() => {
    const destroyedShip = boatDestructionDetection.generateChecker(player);

    if (destroyedShip?.length) {
      if (typeof window !== "undefined") injectStyle();
      const sortedElement = destroyedShip.sort();
      const lastElement = sortedElement.slice(-1).shift()?.name;
      toast.success(`You sunk the ${lastElement}`);
    }

    if (destroyedShip?.length === 5)
      dispatch({ type: Types.Set_Game_Over, payload: { player: "player" } });
  }, [player, dispatch]);

  useEffect(() => {
    if (!response) return;
    if (typeof window !== "undefined") injectStyle();
    toast.dark(response);
  }, [response]);

  return <ToastContainer limit={2} />;
};

export default NoteInformation;
