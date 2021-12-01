import { mapInterface } from "../boardCreator/interface";
import { InitialStateType } from "../../store/interface";
import { arrInterface } from "../boardCreator/interface";
import shipGenerator from "../../service/ships/shipGenerator";
import service from "../../service/gameService/Index";

const EnemyShipDestroyer = (
  enemyBoardData: mapInterface[],
  state: InitialStateType,
  callback: (callback: arrInterface[] | undefined) => void
) => {
  const enemyDestroyedBoats = shipGenerator.generateBoats(enemyBoardData);

  if (service.boardMoved(enemyDestroyedBoats, state.destroyedBoats.player)) {
    return callback(enemyDestroyedBoats);
  }
};

export default EnemyShipDestroyer;
