import styled from "styled-components";
import GenerateBoard from "../service/boardCreator/board";

const Game = () => {
  const player = GenerateBoard("player");
  const enemy = GenerateBoard("enemy");

  return (
    <Section>
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
    </Section>
  );
};

export default Game;

const Div = styled.div`
  margin: 2vmin;
  display: grid;
  background-color: hsl(200, 100%, 50%);
  grid-template-rows: repeat(10, 4.6vmin);
  grid-template-columns: repeat(10, 4.6vmin);
`;

const Grid = styled.div`
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  transition: all 0.2s;
  &:hover {
    background-color: #0868cf;
  }
`;

const Section = styled.section`
  display: flex;
  justify-content: space-evenly;
  max-width: 1800px;
  margin: auto;
`;
