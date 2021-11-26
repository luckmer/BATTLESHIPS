import NavBar from "./components/navbar";
import Game from "./pages/game";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const App = () => {
  return (
    <Main>
      <NavBar />
      <Game />
    </Main>
  );
};

export default App;
