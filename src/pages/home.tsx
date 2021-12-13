import { Link } from "react-router-dom";
import { Main, LinkDiv } from "../css/home.style";

const Home = () => {
  return (
    <Main>
      <Link to="/game" aria-label="GAME">
        <LinkDiv>GAME</LinkDiv>
      </Link>
      <Link to="/help" aria-label="HELP">
        <LinkDiv>HELP</LinkDiv>
      </Link>
    </Main>
  );
};

export default Home;
