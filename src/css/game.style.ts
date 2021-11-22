import styled from "styled-components";
import { Props } from "../pages/interface/index";

export const Ship = styled.div<Props>`
  display: flex;
  margin: 1vmin;
  width: ${({ size }) => `calc(4.6vmin * ${size})`};
  height: calc(4.6vmin * 1);
  border-radius: 2.3vmin;
  background: ${({ setupColor }) => `${setupColor ? "orange" : "grey"} `};
  transition: 0.3s linear;

  cursor: pointer;

  div {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
`;

export const ShipContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-flow: row wrap;
`;

export const ShipGrid = styled.div<any>`
  display: flex;
  transform: rotate(${({ status }) => (status ? "90deg" : "0deg")});
  z-index: 999;
`;

export const Div = styled.div`
  margin: 2vmin;
  display: grid;
  background-color: hsl(200, 100%, 50%);
  grid-template-rows: repeat(10, 4.6vmin);
  grid-template-columns: repeat(10, 4.6vmin);
`;

export const Grid = styled.div`
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  transition: all 0.2s;
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
  margin: 0 auto;
`;

export const Footer = styled.footer`
  margin: 8vmin;
`;
