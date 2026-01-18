import { k } from "./kaplay";
import "./assets";
import "./scenes/menu";
import "./scenes/game";

k.setLayers(["ground", "background", "game", "player", "foreground", "ui"], "game")

k.go("menu");
