import styled from "styled-components";

export const SideDiv = styled.div`
  padding: 20px;
`;

export const DivBox = styled.div`
  display: flex;
  padding-top: 10px;
  align-items: center;
  justify-content: center;

  p,
  small {
    margin: 0 10px;
  }
`;

export const DroppedBox = styled.div`
  border: none;
  width: 100%;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

  border-bottom: 1px solid #0868cf;
  transition: all 0.3s;
  &:active {
    box-shadow: none;
    border-bottom: 1px solid white;
  }
`;

export const DroppedShipContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: column;
  width: 100%;
`;

export const Section = styled.section<{ gameOn: boolean }>`
  bottom: 20px;
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

export const SideMenuPanel = styled.section<{ open: boolean; gameOn: boolean }>`
  // @media screen and (max-width: 772px) {
  //   display: none;
  // }

  z-index: 4000;
  position: absolute;
  height: 100%;
  width: 200px;
  transition: all 0.5s;
  left: ${({ open }) => (open ? "0" : "-100%")};
  background: #0868cf;
  z-index: 1000;
  padding-right: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SideButtons = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px 30px 10px;
`;
export const Header = styled.header`
  text-align: center;
  padding: 10px 0 10px 0;
  color: #fff;
`;
