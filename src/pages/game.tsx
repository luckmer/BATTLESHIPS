import styled from "styled-components";
import GenerateBoard from "../service/boardCreator/board";

const Game = () => {
  const player = GenerateBoard("player");
  const enemy = GenerateBoard("enemy");

  const btns = ["start game", "rotate"];

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
      <ButtonPanel>
        {btns.map((el: string) => (
          <div key={el}>
            <button name={el}>{el}</button>
          </div>
        ))}
      </ButtonPanel>
      <Footer>boats!</Footer>
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

const Rotate = styled.div`
  display: flex;
`;

const ButtonPanel = styled.div`
  margin: 2vmin;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 1800px;
  margin: 0 auto;
`;

const Footer = styled.footer`
  margin: 2vmin;
`;
