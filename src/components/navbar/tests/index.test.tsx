import NavBar from "../index";
import { render } from "@testing-library/react";

describe("NavBar", () => {
  test("should render without errors", () => {
    render(<NavBar />);
  });

  test("should have home panel", () => {
    const { getByLabelText } = render(<NavBar />);

    const homeButton = getByLabelText("home");
    expect(homeButton).toBeInTheDocument();
  });

  test("should have battle panel", () => {
    const { getByLabelText } = render(<NavBar />);

    const homeButton = getByLabelText("battle");
    expect(homeButton).toBeInTheDocument();
  });
});
