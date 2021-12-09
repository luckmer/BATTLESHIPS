import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: auto;
  padding: 20px;
  width: 100%;
  padding: 20px 40px 20px 40px;
  background-color: #0868cf;
`;

export const Section = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: white;
  font-family: "Shippori Antique", sans-serif;
  text-transform: uppercase;

  a {
    text-decoration: none;
    list-style: none;
    color: #fff;
  }
`;

export const H1 = styled.h1`
  cursor: pointer;
`;
