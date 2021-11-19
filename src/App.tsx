import GenerateBoard from "./service/boardCreator/board";
import NavBar from "./components/navbar";

const App = () => {
  const player = GenerateBoard("player");

  console.log(player);

  return (
    <main>
      <NavBar />
      <div></div>
    </main>
  );
};

export default App;
