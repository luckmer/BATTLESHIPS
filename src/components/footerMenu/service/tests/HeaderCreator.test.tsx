import { render } from "@testing-library/react";
import { HeaderCreator } from "../HeaderCreator";

describe("HeaderCreator", () => {
  test("should render without errors", () => {
    render(<HeaderCreator name="home" />);
  });

  test("should have header", () => {
    const { getByRole } = render(<HeaderCreator name="home" />);
    const check = getByRole("dialog");

    expect(check).toBeInTheDocument();
  });

  test("should render component without header", () => {
    const { getByRole } = render(<HeaderCreator name="" />);
    const check = getByRole("dialog");

    expect(check).toBeInTheDocument();
  });
});
