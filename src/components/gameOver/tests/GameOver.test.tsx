import { render } from "@testing-library/react";
import GameOverPanel from "../GameOver";
import generator from "../../../service/boardCreator/generator";
import { shipTypes } from "../../../service/ships";

const helper = () => {
  const enemyBoardData = generator("enemy");
  const shipsData = shipTypes;

  return {
    enemyBoardData,
    shipsData
  };
};

describe("GameOverPanel", () => {
  test("should render without errors", () => {
    const { enemyBoardData, shipsData } = helper();

    render(
      <GameOverPanel shipsData={shipsData} enemyBoardData={enemyBoardData} />
    );
  });

  test("expect home button", () => {
    const { enemyBoardData, shipsData } = helper();

    const { getByLabelText } = render(
      <GameOverPanel shipsData={shipsData} enemyBoardData={enemyBoardData} />
    );
    const homeButton = getByLabelText("home");
    expect(homeButton).toBeInTheDocument();
  });

  test("expect game over header", () => {
    const { enemyBoardData, shipsData } = helper();

    const { getByLabelText } = render(
      <GameOverPanel shipsData={shipsData} enemyBoardData={enemyBoardData} />
    );
    const homeButton = getByLabelText("header");
    expect(homeButton).toBeInTheDocument();
  });
});
