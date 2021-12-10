import { mapInterface } from "../../service/boardCreator/interface";
import { Div, Grid, RedDot } from "../../css/game.style";
import { Fragment } from "react";

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
          attack,
          opponent,
          name
        }: {
          attack: boolean;
          id: number;
          used: boolean;
          name?: string;
          opponent?: string;
        }) => {
          const test = name !== "enemy" && attack;

          return (
            <Grid
              key={id}
              boat={used}
              opponent={opponent}
              attack={attack}
              id={String(id)}
              onClick={() => props.handleShipAttack(id)}
            >
              <Fragment>
                <RedDot attack={attack} shipDetected={test} color="#ECB365" />
                {!test && <RedDot attack={attack} />}
              </Fragment>
            </Grid>
          );
        }
      )}
    </Div>
  );
};

export default ComputerGame;
