import { mapInterface } from "../../service/boardCreator/interface";
import { Div, Grid } from "../../css/game.style";

interface propsInterface {
  shipData: mapInterface[];
  handleShipAttack: (id: number) => void;
}

const ComputerGame = (props: propsInterface) => {
  const { shipData }: propsInterface = props;

  return (
    <Div>
      {shipData.map(
        ({
          id,
          used,
          attack
        }: {
          attack: boolean;
          id: number;
          used: boolean;
        }) => {
          return (
            <Grid
              key={id}
              boat={used}
              attack={attack}
              id={String(id)}
              onClick={() => props.handleShipAttack(id)}
            />
          );
        }
      )}
    </Div>
  );
};

export default ComputerGame;
