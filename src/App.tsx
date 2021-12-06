import { useContext } from "react";
import { AppContext } from "./store/store";
import { Main } from "./css/Main.style";

import { NavBar, NoteInformation, SideMenu } from "./components";
import Game from "./pages/game";

const App = () => {
  const { state } = useContext(AppContext);
  const notification = state.moveStatus;
  const destroyedBoats = state.destroyedBoats;

  return (
    <Main>
      <SideMenu />
      <NoteInformation
        notification={notification}
        destroyedBoats={destroyedBoats}
      />
      <NavBar />
      <Game />
    </Main>
  );
};

export default App;
