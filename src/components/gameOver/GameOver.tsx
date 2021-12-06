import { Section } from "../../css/game.style";
import { GameOverSpacer, Modal } from "../css/gameOver.style";
import { mapInterface } from "../../service/boardCreator/interface";
import { shipInterface } from "../../service/ships/interface";

interface OverProps {
  enemyBoardData: mapInterface[];
  shipsData: shipInterface[];
}

const GameOverPanel = (props: OverProps) => {
  const { enemyBoardData, shipsData } = props;

  const player = enemyBoardData.filter((el) => el.attack && !el.used).length;

  let accuracy = (100 * shipsData.length) / player;
  const displayAccuracy =
    accuracy >= 100 || accuracy === Infinity || isNaN(accuracy)
      ? 100
      : accuracy;

  return (
    <Section>
      <Modal>
        <GameOverSpacer>
          <h1>Game Over</h1>
          <p>
            You have sunk all ships with
            <strong>accuracy {~~displayAccuracy}%</strong>
          </p>
          <button> Home </button>
        </GameOverSpacer>
      </Modal>
    </Section>
  );
};

export default GameOverPanel;
