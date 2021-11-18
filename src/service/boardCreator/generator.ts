import { mapInterface } from "./interface";
import { GRID_SIZE } from "../constants";

const generator = (name: string) => {
  const map: mapInterface[] = [];

  let placeText = 0;
  let index = 0;
  let dark = false;

  const alphabet = [...Array(11)].map((_, w) => String.fromCharCode(w + 96));

  let number = Array(GRID_SIZE + 1)
    .fill(0)
    .map(() => Array.from({ length: 10 }, (_, i) => i + 1));

  for (let i = 1; i <= GRID_SIZE; i++) {
    if (~~((i - 1) % 10) === 0) {
      placeText++;
    }

    if (dark) {
      index++;
      dark = !dark;
    } else {
      index++;
      dark = !dark;
    }

    if (index === 10) {
      dark = !dark;
      index = 0;
    }

    const placer = alphabet[placeText];

    const location =
      number[i][index - 1] === undefined ? 10 : number[i][index - 1];

    const grid = { id: i, _id: i, name, placer, location };

    map.push(grid);
  }

  return map;
};

export default generator;
