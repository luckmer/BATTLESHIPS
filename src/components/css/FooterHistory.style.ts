import styled from "styled-components";

export const ButtonSection = styled.div`
  width: 100%;
`;
export const Button = styled.button`
  margin-top: 20px;
  cursor: pointer;
  font: inherit;
  font-size: 1.25rem;
  padding: 0.25em;
  width: 100%;
  font-weight: 500;
  background-color: #292d38;
  border-radius: 6px;
  color: #fff;
  border: 0;
`;

export const SideShipContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
  margin-bottom: 60px;
  padding: 0 20px 0 20px;
`;

export const SideShipContent = styled.div<{ setupColor: boolean }>`
  border: none;
  width: 100%;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  background-color: ${({ setupColor }) => (setupColor ? "#292d38" : "")};
  margin-bottom: 20px;
  color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  border-radius: 10px;
  border-bottom: 1px solid #0868cf;
  transition: all 0.3s;
  &:active {
    box-shadow: none;
    border-bottom: 1px solid white;
  }
`;
