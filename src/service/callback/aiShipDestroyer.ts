import { mapInterface, arrInterface } from "../boardCreator/interface";
import { InitialStateType } from "../../store/interface";
import service from "../gameService/Index";
import shipGenerator from "../ships/shipGenerator";

const AiShipDestroyer = (
  boardData: mapInterface[],
  setBoard: React.Dispatch<React.SetStateAction<mapInterface[]>>,
  state: InitialStateType,
  callback: (callback: arrInterface[] | undefined) => void
) => {
  const AiAttack = ~~(Math.random() * boardData.length);

  const findAttack = boardData.find((el: { id: number }) => el.id === AiAttack);

  let randomPozition;

  while (findAttack?.attack === true) {
    let random = ~~(Math.random() * boardData.length);
    randomPozition = boardData.find((el: { id: number }) => el.id === random);
    if (randomPozition?.attack === false) break;
  }

  const randomAttack = randomPozition ? randomPozition : findAttack;

  if (!randomAttack) return;

  const update = boardData.map((el) => {
    if (el.id === randomAttack.id) return { ...el, attack: true, miss: true };

    if (el.name === "enemy") return { ...el, miss: true };
    if (el.name !== "enemy") return { ...el, miss: false, missed: false };

    return el;
  });

  const updateTest = update.map((el) => {
    if (el.id === randomAttack.id && el.name === randomAttack.name)
      return { ...el, attacked: [...el.attacked, randomAttack?.id] };

    return el;
  });

  if (service.boardMoved(boardData, updateTest)) setBoard(updateTest);
  const playerDestroyedBoats = shipGenerator.generateBoats(updateTest);

  if (service.boardMoved(playerDestroyedBoats, state.destroyedBoats.ai)) {
    return callback(playerDestroyedBoats);
  }
};

export default AiShipDestroyer;
