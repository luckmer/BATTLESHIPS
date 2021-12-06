import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { AppContext } from "./store/store";
import { Main } from "./css/Main.style";
import { NavBar, NoteInformation } from "./components";
import { routes } from "./routes";

const App = () => {
  const { state } = useContext(AppContext);
  const notification = state.moveStatus;
  const destroyedBoats = state.destroyedBoats;

  return (
    <Main>
      <NoteInformation
        notification={notification}
        destroyedBoats={destroyedBoats}
      />
      <NavBar />
      <Routes>
        {routes.map(({ path, Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Routes>
    </Main>
  );
};

export default App;
