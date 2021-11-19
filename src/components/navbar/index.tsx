import { AiOutlineHome } from "react-icons/ai";
import { Nav, Section, H1 } from "../css/navbar.style";

const NavBar = () => {
  return (
    <Nav>
      <Section>
        <div>
          <H1>BATTLESHIP</H1>
        </div>
        <div>
          <H1>
            <AiOutlineHome />
          </H1>
        </div>
      </Section>
    </Nav>
  );
};

export default NavBar;
