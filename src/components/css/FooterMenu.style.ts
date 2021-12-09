import styled from "styled-components";

export const BoxDiv = styled.div`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputButton = styled.input`
  border: none;
  background: none;
  border-left: 1px solid #292d38;
  width: 80%;
  margin: auto;
  color: white;
  padding-bottom: 5px;
`;

export const BoxSpacer = styled.div<{ move: boolean }>`
  z-index: 1002;
  margin: 15px 0 15px 0;
  transition: all 0.5s;
  overflow: hidden;
  height: ${(props) => (props.move ? "100px" : "50px")};
`;

export const Form = styled.form`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 425px;
  border-radius: 10px;
  padding: 0.75rem;
`;

export const FormDiv = styled.div`
  z-index: 1003;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputSpacer = styled.div`
  padding: 20px 0 20px 0;
  width: 80%;
  margin: auto;
`;

export const Input = styled.input`
  border: none;
  z-index: 1;
  background-color: transparent;
  border-bottom: 1px solid #eee;
  font: inherit;
  width: 100%;
  font-size: 1.125rem;
  padding: 0.25rem 0;
  border-wdith: 10px;
  transition: all 0.5s;

  color: #fff;
  &::placeholder {
    color: #fff;
    opacity: 1;
  }

  &:focus {
    border-bottom: 1px solid #292d38;
    border-wdith: 10px;
    outline: none !important;
  }
`;

export const FormButton = styled.input`
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

export const RotationContainer = styled.div`
  width: 100%;
`;

export const CheckBox = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    transition: all 0.5s;
    border-radius: 40px;
    text-align: center;
    margin-bottom: 0.5rem;
    margin: 0px;
    padding: 5px 20px 5px 20px;
    text-align: center;
  }

  input:checked + label {
    background-color: #292d38;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + span {
    display: inline-block;
    position: relative;
    top: -1px;
    width: 12px;
    height: 12px;
    margin: -1px 0px 0 0;
    vertical-align: middle;
    background: white left top no-repeat;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + span {
    background: #d9534f -19px top no-repeat;
  }

  input[type="checkbox"] + span {
    margin-right: 4px;
  }
`;

export const ArrowCreator = styled.div<{ rotate: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  svg {
    transition: all 0.5s;
    transform: rotate(
      ${({ rotate }) => (rotate.toString() === "true" ? "180deg" : "0deg")}
    );
  }
`;

export const Footer = styled.footer<{ openSiteMenu: boolean; height: number }>`
  @media screen and (min-width: 772px) {
    display: none;
  }

  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -ms-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
  transform: translate(0, 0);
  border-bottom: 1px solid white;

  bottom: 0;
  overflow: hidden;
  width: 100%;
  height: 40px;
  background: #0868cf;
  color: #fff;
  z-index: 3000;
`;

export const FooterSection = styled.div<{
  openSiteMenu: boolean;
  height: number;
}>`
  @media screen and (min-width: 772px) {
    display: none;
  }
  overflow: auto;
  align-items: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100%;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -ms-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
  position: absolute;
  bottom: 0;
  height: ${({ openSiteMenu, height }) => (openSiteMenu ? `${height}px` : `0`)};
  background-color: #0868cf;
  color: white;
  z-index: 2999;
  padding: 0 0 40px 0;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ShipsContainer = styled.div`
  padding: 20px 10px 20px 10px;
  width: 100%;
`;

export const ShipsHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

export const ShipsHeader = styled.header`
  font-weight: bold;
  width: 50%;
  margin: auto;
  border-bottom: 1px solid white;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 10px;
  cursor: pointer;
`;

export const ShipsDisplayContainer = styled.div`
  transform-origin: top;
  overflow: hidden;
  width: 100%;
  transition: all 0.5s;
`;
