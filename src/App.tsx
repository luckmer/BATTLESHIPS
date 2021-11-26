import { useContext } from "react";

import NavBar from "./components/navbar";
import Game from "./pages/game";
import styled from "styled-components";
import { AppContext } from "./data/store";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const App = () => {
  const store = useContext(AppContext);

  return (
    <Main>
      <NavBar />
      <Game />
    </Main>
  );
};

export default App;
