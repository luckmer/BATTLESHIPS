import { useContext } from "react";

import { AppContext } from "./store/store";
import { Main } from "./css/Main.style";

import NoteInformation from "./components/notifications/NoteInformation";
import NavBar from "./components/navbar";
import Game from "./pages/game";

const App = () => {
  const { state } = useContext(AppContext);

  const notification = state.moveStatus;

  return (
    <Main>
      <NoteInformation notification={notification} />
      <NavBar />
      <Game />
    </Main>
  );
};

export default App;
