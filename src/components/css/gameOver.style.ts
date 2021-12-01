import styled from "styled-components";
export const GameOverSpacer = styled.div`
  margin: auto;
  padding: 20px;
  width: 90%;
  color: #fff;
  text-align: center;

  h1 {
    font-size: 4em;
  }

  button {
    border: 3px solid #fff;
    color: #fff;
    font-family: inherit;
    font-size: inherit;
    background: none;
    cursor: pointer;
    padding: 20px 50px;
    display: inline-block;
    margin: 15px 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    &:hover {
      color: @font-color;
      background: #fff;
    }
  }
`;

export const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;
