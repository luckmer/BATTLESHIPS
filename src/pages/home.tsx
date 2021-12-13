import { Link } from "react-router-dom";
import { Main, LinkDiv } from "../css/home.style";

const Home = () => {
  return (
    <Main>
      <Link to="/game">
        <LinkDiv>GAME</LinkDiv>
      </Link>
      <Link to="/help">
        <LinkDiv>HELP</LinkDiv>
      </Link>
    </Main>
  );
};

export default Home;
