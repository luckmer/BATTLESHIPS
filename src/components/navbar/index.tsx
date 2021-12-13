import { memo } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Nav, Section, H1 } from "../css/navbar.style";

const NavBar = () => {
  return (
    <Nav>
      <Section>
        <div>
          <a href="/game" aria-label="battle">
            <H1>BATTLESHIP</H1>
          </a>
        </div>
        <div>
          <a href="/" aria-label="home">
            <H1>
              <AiOutlineHome />
            </H1>
          </a>
        </div>
      </Section>
    </Nav>
  );
};

export default memo(NavBar);
