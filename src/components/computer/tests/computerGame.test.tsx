import generator from "../../../service/boardCreator/generator";
import { render } from "@testing-library/react";
import ComputerGame from "../computerGame";

describe("ComputerGame", () => {
  test("should render ComputerGame with no errors", () => {
    const handleShipAttack = () => {};
    const map = generator("enemy");

    render(<ComputerGame shipData={map} handleShipAttack={handleShipAttack} />);
  });

  test("should have dots", () => {
    const handleShipAttack = () => {};
    const map = generator("enemy");

    const ships = render(
      <ComputerGame shipData={map} handleShipAttack={handleShipAttack} />
    );

    const check = ships.getByRole("dialog");

    expect(check).toBeInTheDocument();
  });

  test("should have length equal to 100", () => {
    const map = generator("enemy").length;

    expect(map).toEqual(100);
  });

  test("should not less than 100", () => {
    const map = generator("enemy").length;

    expect(map).not.toEqual(99);
  });
});
