import { k } from "../kaplay";
import { gridManager } from "./gridManager";
import { spawnManager } from "./spawnManager";

export function createGameManager(){
  const gameManager = k.add([
    "gameManager",

    k.state("game", ["pause", "game"]),
    gridManager(),
    spawnManager(),
    k.stay()
  ])

  return gameManager;
}