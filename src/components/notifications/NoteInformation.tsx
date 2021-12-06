import { useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { AppContext } from "../../store/store";
import { Types } from "../../store/types";

interface arrInterface {
  attacked: number[];
  name: string;
  size: string | number;
}

interface PropsInterface {
  notification: {
    status: boolean;
    response: string;
  };
  destroyedBoats: {
    player: arrInterface[] | undefined;
    ai: arrInterface[] | undefined;
  };
}

const NoteInformation = (props: PropsInterface) => {
  const { dispatch } = useContext(AppContext);

  const { notification, destroyedBoats } = props;
  const { player, ai } = destroyedBoats;

  const response = notification.response;

  useEffect(() => {
    if (ai?.length) {
      if (typeof window !== "undefined") injectStyle();
      const sortedElement = ai.sort();
      const lastElement = sortedElement.slice(-1).shift()?.name;

      toast.warn(`the enemy sunk your ${lastElement}`);
    }

    if (ai?.length === 5)
      dispatch({ type: Types.Set_Game_Over, payload: { player: "ai" } });
  }, [ai, dispatch]);

  useEffect(() => {
    if (player?.length) {
      if (typeof window !== "undefined") injectStyle();
      const sortedElement = player.sort();
      const lastElement = sortedElement.slice(-1).shift()?.name;
      toast.success(`You sunk the ${lastElement}`);
    }

    if (player?.length === 5)
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
