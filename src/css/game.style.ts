import styled from "styled-components";
import { Props } from "../pages/interface/index";

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

  &:hover {
    background: ${({ setupColor }) => `${setupColor ? "#181D31" : "#E6DDC4"} `};
  }
`;

export const ShipGrid = styled.div<any>`
  transform: rotate(${({ status }) => (status ? "90deg" : "0deg")});
  z-index: 999;
  height: calc(
    ${({ size, status }) => (status ? `4.6vmin *${size}` : `4.6vmin`)}
  );
  margin: 40px 0 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Div = styled.div`
  margin: 2vmin;
  display: grid;
  background-color: hsl(200, 100%, 50%);
  grid-template-rows: repeat(10, 4.6vmin);
  grid-template-columns: repeat(10, 4.6vmin);
`;

interface Test {
  boat: string | boolean | undefined;
  attack?: string | boolean | undefined;
}

export const Grid = styled.div<Test>`
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  transition: all 0.2s;

  background-color: ${({ boat, attack }) =>
    attack ? "red" : boat ? "grey" : ""};

  &:hover {
    background-color: #0868cf;
  }
`;

export const Rotate = styled.div`
  display: flex;
  justify-content: center;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 1800px;
  height: 100%;
  margin: 0 auto;
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
