import GenerateBoard from "../service/boardCreator/board";
import ShipPanel from "../service/ships/shipPanel";
import { boardsInterface } from "./interface";
import {
  Section,
  Rotate,
  Div,
  Grid,
  Footer,
  ShipContainer,
  ShipGrid,
  Ship
} from "../css/game.style";

const Game = () => {
  const player = GenerateBoard("player");
  const enemy = GenerateBoard("enemy");
  const { shipData } = ShipPanel();

  return (
    <Section>
      <Rotate>
        <Div>
          {player.map(({ id }: { id: number }) => (
            <Grid key={id}></Grid>
          ))}
        </Div>

        <Div>
          {enemy.map(({ id }: { id: number }) => (
            <Grid key={id}></Grid>
          ))}
        </Div>
      </Rotate>
      <Footer>
        <ShipContainer>
          {shipData.map(({ id, size }: boardsInterface) => (
            <ShipGrid key={id}>
              <Ship size={size} />
            </ShipGrid>
          ))}
        </ShipContainer>
      </Footer>
    </Section>
  );
};

export default Game;
