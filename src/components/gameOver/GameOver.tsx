import { memo } from "react";
import { mapInterface } from "../../service/boardCreator/interface";
import { GameOverSpacer, Modal } from "../css/gameOver.style";
import { shipInterface } from "../../service/ships/interface";
import { Section } from "../../css/game.style";

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
          <h1 aria-label="header">Game Over</h1>
          <p>
            You have sunk all ships with <br />
            <strong>accuracy {~~displayAccuracy}%</strong>
          </p>
          <a href="/">
            <button aria-label="home">HOME</button>
          </a>
        </GameOverSpacer>
      </Modal>
    </Section>
  );
};

export default memo(GameOverPanel);
