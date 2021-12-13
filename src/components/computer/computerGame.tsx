import { mapInterface } from "../../service/boardCreator/interface";
import { Div, Grid, RedDot } from "../../css/game.style";
import { Fragment, memo, useCallback } from "react";

interface propsInterface {
  shipData: mapInterface[];
  handleShipAttack: (id: number) => void;
}

const ComputerGame = (props: propsInterface) => {
  const { shipData, handleShipAttack }: propsInterface = props;

  const ClickTest = useCallback(
    (id) => handleShipAttack(id),
    [handleShipAttack]
  );

  return (
    <Div role="dialog">
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
              onClick={() => ClickTest(id)}
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

export default memo(ComputerGame);
