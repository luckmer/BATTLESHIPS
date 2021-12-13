import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LinkDiv = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 10px;
  border: 2px solid #fff;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 1s ease;
  position: relative;
  display: inline-block;
  text-align: center;
  position: relative;
  color: #ff7d93;
  z-index: 2;
  line-height: 50px;
  padding: 0;
  &&:hover {
    border: none;
  }
  &&:before,
  &&:after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border: 2px solid;
    border-radius: 5px;
    z-index: -1;
    transition: all 0.4s ease;
  }
  &&:before {
    top: 0;
    left: 0;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: #f0d4e7;
    border-left-color: #f0d4e7;
    border-radius: 5px;
  }
  &&:after {
    bottom: 0;
    right: 0;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: #f0d4e7;
    border-right-color: #f0d4e7;
    border-radius: 5px;
  }
  &&:hover:before,
  &&:hover:after {
    border-color: #f0d4e7;
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }
`;
