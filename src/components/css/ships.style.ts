import styled from "styled-components";

export const Section = styled.section<{ gameOn: boolean }>`
  bottom: 80px;
  position: absolute;
  left: ${({ gameOn }) => (gameOn ? "-100%" : "0")};
  transition: all 1.5s;
`;

export const Clicker = styled.div`
  @media screen and (max-width: 772px) {
    display: none;
  }

  width: 70px;
  height: 45px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #0868cf;
  transition: all 0.5s;
  &:hover {
    width: 65px;
  }
  padding-right: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  p {
    padding-right: 5px;
  }
  &:active {
    width: 75px;
  }
`;

export const SideShipPanel = styled.div<{ open: boolean; gameOn: boolean }>`
  @media screen and (max-width: 772px) {
    display: none;
  }

  position: absolute;
  max-height: 100vh;
  height: 100%;
  width: auto;
  transition: all 0.5s;
  left: ${({ open }) => (open ? "0" : "-100%")};
  top: 0;
  background: #0868cf;
  z-index: 1000;
  padding-right: 20px;
  padding-left: 20px;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SidePanel = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px 30px 10px;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  flex-direction: column;
  width: 100%;
`;
export const Header = styled.header`
  text-align: center;
  padding: 40px 10px 10px 10px;
  color: #fff;
`;
