import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../home";

describe("home", () => {
  test("should handle game link", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const text = getByLabelText("GAME");

    expect(text).toBeInTheDocument();
  });

  test("should handle help link", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const text = getByLabelText("HELP");

    expect(text).toBeInTheDocument();
  });
});
