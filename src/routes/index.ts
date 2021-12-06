import Home from "../pages/home";
import Game from "../pages/game";
import Help from "../pages/help";
import IncorrectPage from "../pages/404";

export const routes = [
  { path: "/home", Element: Home },
  { path: "", Element: Game },
  { path: "/help", Element: Help },
  { path: "*", Element: IncorrectPage }
];
