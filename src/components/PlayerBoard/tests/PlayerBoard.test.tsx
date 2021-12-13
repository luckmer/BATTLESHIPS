import PlayerBoard from "../PlayerBoard";
import generator from "../../../service/boardCreator/generator";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

const Helper = () => {
  const boardData = generator("enemy");
  const handleDragOver = () => {};
  const handleDropPlayer = () => {};

  const state: any = {
    droppedPlayerShips: [],
    selectedShipOptions: {
      setBoats: [],
      updateCurrentMove: []
    }
  };

  return { boardData, handleDragOver, handleDropPlayer, state };
};

describe("PlayerBoard", () => {
  test("should render PlayerBoard without errors", () => {
    const { boardData, handleDragOver, handleDropPlayer, state } = Helper();

    render(
      <PlayerBoard
        state={state}
        boardData={boardData}
        handleDragOver={handleDragOver}
        handleDropPlayer={handleDropPlayer}
      />
    );
  });

  test("should have grid area", () => {
    const { boardData, handleDragOver, handleDropPlayer, state } = Helper();

    const { getByLabelText } = render(
      <PlayerBoard
        state={state}
        boardData={boardData}
        handleDragOver={handleDragOver}
        handleDropPlayer={handleDropPlayer}
      />
    );

    const element = getByLabelText("main_container");

    expect(element).toBeInTheDocument();
  });
});
