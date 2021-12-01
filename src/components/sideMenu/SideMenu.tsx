import { Fragment, useState, useContext } from "react";
import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";

const Section = styled.section`
  bottom: 20px;
  position: absolute;
`;

const Clicker = styled.div`
  width: 60px;
  height: 25px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #0868cf;
  transition: all 0.5s;
  &:hover {
    width: 65px;
  }
  padding-right: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SideMenuPanel = styled.section<{ open: boolean }>`
  position: absolute;
  height: 100%;
  width: 200px;
  transition: all 0.5s;
  left: ${({ open }) => (open ? "0" : "0")};
  background: #0868cf;
  z-index: 1000;
  padding-right: 20px;
`;

const SideButtons = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px 30px 10px;
`;

const Button = styled.button`
  border: none;
  border-bottom: 1px solid black;
  background: transparent;
  transition: all 0.5s;
  &:hover {
    color: #fff;
    border-bottom: 1px solid #fff;
  }
`;

const SideMenu = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const handleClick = () => setOpenSideMenu(!openSideMenu);

  return (
    <Fragment>
      <SideMenuPanel open={openSideMenu}>
        <SideButtons>
          <div>
            <h1>Moves</h1>
          </div>
          <Button onClick={handleClick}>Close</Button>
        </SideButtons>
        <div></div>
      </SideMenuPanel>
      <Section>
        <Clicker onClick={handleClick}>
          <AiOutlineArrowRight />
        </Clicker>
      </Section>
    </Fragment>
  );
};

export default SideMenu;
