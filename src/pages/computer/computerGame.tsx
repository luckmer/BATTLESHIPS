import { Div, Grid } from "../../css/game.style";
import { mapInterface } from "../../service/boardCreator/interface";

interface propsInterface {
  shipData: mapInterface[];
}

const ComputerGame = (props: propsInterface) => {
  return (
    <Div>
      {props.shipData.map(({ id, used }: { id: number; used: boolean }) => (
        <Grid key={id} boat={used} id={String(id)} />
      ))}
    </Div>
  );
};

export default ComputerGame;
