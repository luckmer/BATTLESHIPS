import styled, { keyframes } from "styled-components";
import { Props } from "../pages/interface/index";

const board = keyframes`

0%{
  width: 100%;
  height: 100%;
  opacity:0.1;
  }

  20%{
    opacity:1;
  }

  50%{
    transform: scale(1.5);
    opacity:0;
  }



  100%{
    opacity:0;
    width: 100%;
    height: 100%;
  }


`;

const hit = keyframes`

0% {
  opacity: 1;
  transform: scale(0);
}

100% {
  opacity: 0;
  transform: scale(3);
  width:0px;
  height:0px;
  display:none;

}
`;

const waterCollision = keyframes`
  0%{
    transform: scale(1);
  }


  50%{
    transform: scale(1.2);
  }

  100%{
    transform: scale(1);
  }
`;

export const FooterSlicer = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const RedDot = styled.section<{
  attack: boolean;
  shipDetected?: boolean;
  color?: string;
}>`
  width: 2vmin;
  height: 2vmin;
  position: absolute;
  border-radius: 100px;
  background-color: ${({ shipDetected, attack }) =>
    attack && shipDetected ? "red" : "#ECB365"};

  animation: ${waterCollision} 1s linear forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  display: ${({ attack }) => (attack ? "block" : "none")};
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    animation: ${hit} 0.5s linear forwards;
    border: ${({ attack, shipDetected }) =>
      attack && shipDetected ? "1vmin solid red" : "1vmin solid white"};
    border-radius: 100%;
  }
`;

export const Ship = styled.div<Props>`
  display: flex;
  margin: 1vmin;
  width: ${({ size }) => `calc(4.6vmin * ${size})`};
  height: calc(4.6vmin * 1);
  border-radius: 2.3vmin;

  background: ${({ setupColor }) => `${setupColor ? "orange" : "#fff"} `};
  transition: 0.3s linear;

  cursor: pointer;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  @media screen and (min-width: 772px) {
    &:hover {
      background: ${({ setupColor }) =>
        `${setupColor ? "#181D31" : "#E6DDC4"} `};
    }
  }
`;

export const ShipGrid = styled.div<any>`
  transform: rotate(${({ status }) => (status ? "90deg" : "0deg")});
  z-index: 999;
  height: calc(${({ size, status }) => (status ? `3vmin * ${size}` : `vmin`)});

  margin: 80px 0 80px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Div = styled.div`
  margin: 2vmin;
  display: grid;
  background-color: hsl(200, 100%, 50%);
  border: 20px outset #007ebd;

  grid-template-rows: repeat(10, 4.6vmin);
  grid-template-columns: repeat(10, 4.6vmin);
`;

export const DivBoat = styled.div<any>`
  justify-content: center;
  align-items: center;

  border-top: ${({ boat, rotated }) =>
    boat && !rotated ? `2px solid #ecb365` : ""};
  border-bottom: ${({ boat, rotated }) =>
    boat && !rotated ? `2px solid #ecb365` : ""};

  border-left: ${({ boat, rotated }) =>
    boat && rotated ? `2px solid #ecb365` : ""};
  border-right: ${({ boat, rotated }) =>
    boat && rotated ? `2px solid #ecb365` : ""};
  z-index: 2;
  &:after {
    content: "";
    border-top: ${({ boat, rotated }) =>
      boat && !rotated ? `2px solid #fff` : ""};
    border-bottom: ${({ boat, rotated }) =>
      boat && !rotated ? `2px solid #fff` : ""};

    border-left: ${({ boat, rotated }) =>
      boat && rotated ? `2px solid #fff` : ""};
    border-right: ${({ boat, rotated }) =>
      boat && rotated ? `2px solid #fff` : ""};

    animation: ${board} 2s linear infinite;

    border-top-right-radius: ${({ findEnd, rotated, findStart }) =>
      (findEnd && !rotated) || (findStart && rotated) ? "20px" : "0px"};
    border-top-left-radius: ${({ findStart }) => (findStart ? "20px" : "0px")};
    border-bottom-right-radius: ${({ findEnd }) => (findEnd ? "20px" : "0px")};
    border-bottom-left-radius: ${({ findEnd, rotated, findStart }) =>
      (findEnd && rotated) || (findStart && !rotated) ? "20px" : "0px"};
  }

  border-top-right-radius: ${({ findEnd, rotated, findStart }) =>
    (findEnd && !rotated) || (findStart && rotated) ? "20px" : "0px"};
  border-top-left-radius: ${({ findStart }) => (findStart ? "20px" : "0px")};
  border-bottom-right-radius: ${({ findEnd }) => (findEnd ? "20px" : "0px")};
  border-bottom-left-radius: ${({ findEnd, rotated, findStart }) =>
    (findEnd && rotated) || (findStart && !rotated) ? "20px" : "0px"};

  border-spacing: 10px 5px;
  z-index: 1;
  width: 100%;
  height: 100%;

  display: ${({ boat }) => (boat ? "flex" : "none")};
`;

export const Grid = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: ${({ location, placer, opponent, boat, attack }) =>
      attack
        ? ""
        : boat
        ? opponent === "enemy"
          ? `"${placer}${location}"`
          : ``
        : attack
        ? ""
        : `"${placer}${location}"`};

    z-index: 2;
    position: absolute;
    color: #f1efe9;
    font-size: 1.5vmin;
    font-family: "Shippori Antique", sans-serif;
  }

  border: ${({ boat, status }) =>
    boat && status === "player" ? "none" : " 1px solid hsla(0, 0%, 100%, 0.2)"};

  background-color: ${({ boat, opponent }) =>
    boat ? (opponent === "enemy" ? "" : "#064663") : ""};

  border-top-right-radius: ${({ findEnd, rotated, findStart }) =>
    (findEnd && !rotated) || (findStart && rotated) ? "20px" : "0px"};
  border-top-left-radius: ${({ findStart }) => (findStart ? "20px" : "0px")};
  border-bottom-right-radius: ${({ findEnd }) => (findEnd ? "20px" : "0px")};
  border-bottom-left-radius: ${({ findEnd, rotated, findStart }) =>
    (findEnd && rotated) || (findStart && !rotated) ? "20px" : "0px"};

  &:hover {
    background-color: #0868cf;
  }
`;

export const Rotate = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 772px) {
    flex-direction: column;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 1800px;
  margin: 0 auto;
  height: 100%;
`;

export const GameDiv = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: center;
  flex-flow: row wrap;
`;

export const GameButton = styled.div`
  margin: 0 20px;
`;

export const Button = styled.button`
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  position: relative;
  display: inline-block;
  background: #0868cf;
  color: #fff;
  z-index: 1;
  border: none;
  border-bottom: 1px solid white;

  &:after {
    border-bottom: 1px solid black;
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background: white;
    transition: all 0.3s ease;
  }
  &:hover {
    color: #000;
  }
  &:hover:after {
    left: 0;
    width: 100%;
  }
  &:active {
    top: 2px;
  }
`;
