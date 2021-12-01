import { mapInterface } from "../../service/boardCreator/interface";
import { Div, Grid } from "../../css/game.style";

interface PlayerBoardProps {
  boardData: mapInterface[];
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropPlayer: (e: React.DragEvent<HTMLDivElement>) => void;
}

const PlayerBoard = (props: PlayerBoardProps) => {
  const { handleDragOver, boardData, handleDropPlayer } = props;

  return (
    <Div>
      {boardData.map(
        (
          {
            id,
            used,
            attack
          }: { attack: boolean; id: number; used: string | boolean },
          i
        ) => (
          <Grid
            id={String(i + 1)}
            key={id}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDropPlayer(e)}
            boat={used}
            attack={attack}
          />
        )
      )}
    </Div>
  );
};

export default PlayerBoard;
