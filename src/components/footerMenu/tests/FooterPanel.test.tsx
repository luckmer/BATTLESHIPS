import { render, fireEvent, screen } from "@testing-library/react";
import FooterPanel from "../FooterPanel";
import { AiOutlineArrowUp } from "react-icons/ai";

const helper = () => {
  const openSiteMenu = true;
  const arrowUp = <AiOutlineArrowUp />;
  const height = 820;
  const handleTouchStart = () => {};

  return { openSiteMenu, arrowUp, height, handleTouchStart };
};

describe("FooterPanel", () => {
  test("should render without errors", () => {
    const { openSiteMenu, arrowUp, height, handleTouchStart } = helper();

    render(FooterPanel(handleTouchStart, openSiteMenu, height, arrowUp));
  });

  test("should fire click", () => {
    const { openSiteMenu, arrowUp, height, handleTouchStart } = helper();

    render(FooterPanel(handleTouchStart, openSiteMenu, height, arrowUp));

    const Button = screen.getByRole("button");

    expect(Button).toBeInTheDocument();
  });
});
