import { GameDiv, GameButton, Button } from "../../css/game.style";

interface ButtonProps {
  handleStartGame: () => void;
}

const ButtonPanel = (props: ButtonProps) => {
  const { handleStartGame } = props;

  return (
    <GameDiv>
      <GameButton>
        <Button onClick={handleStartGame}>Start Game</Button>
      </GameButton>
    </GameDiv>
  );
};

export default ButtonPanel;
