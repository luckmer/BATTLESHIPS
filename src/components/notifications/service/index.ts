import { arrInterface } from "../interface/arrInterface";

const ObjData = (ai: arrInterface[] | undefined) => {
  const shipName = ai?.map((el) => el.name).filter((el) => el !== "enemy");

  const obj: {
    [key: string]: number;
  } = {};

  shipName?.forEach((el) => (obj[el] = (obj[el] | 0) + 1));

  const lives: {
    [key: string]: number;
  } = {
    Aircraft: 5,
    Carrier: 5,
    Battleship: 4,
    Cruiser: 3,
    Submarine: 3
  };

  return { obj, lives };
};

export default ObjData;
