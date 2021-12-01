import { GameDiv, GameButton, Button } from "../../css/game.style";

interface ButtonProps {
  handleStartGame: () => void;
  handleRestartGame: () => void;
}

const ButtonPanel = (props: ButtonProps) => {
  const { handleStartGame, handleRestartGame } = props;

  return (
    <GameDiv>
      <GameButton>
        <Button onClick={handleStartGame}>Start Game</Button>
      </GameButton>
      <GameButton>
        <Button onClick={handleRestartGame}>Restart</Button>
      </GameButton>
    </GameDiv>
  );
};

export default ButtonPanel;
