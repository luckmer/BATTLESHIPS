import { render } from "@testing-library/react";
import ButtonPanel from "../ButtonPanel";

describe("test", () => {
  test("should render without errors", () => {
    const handleStartGame = () => {};
    render(<ButtonPanel handleStartGame={handleStartGame} />);
  });

  test("start button should be in the document", () => {
    const handleStartGame = () => {};

    const text = render(<ButtonPanel handleStartGame={handleStartGame} />);

    const check = text.getByRole("dialog");

    expect(check).toBeInTheDocument();
  });
});
