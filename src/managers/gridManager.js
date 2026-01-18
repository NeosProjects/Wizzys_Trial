import { k } from "../kaplay";

import { createBush } from "../gameObjects/bush";

function createGrid(width, height){
  for (let i = 0; i < 200; i++){
    createBush();
  }

  const tileSize = 16 * 6;
  const offset = (k.width() - tileSize * width) / 2 + tileSize/2;

  const tiles = [];

  for (let x = 0; x < width; x++){
    tiles[x] = [];

    for (let y = 0; y < height; y++){
      const sprite = (x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0) ? "dark_grass" : "light_grass";

      const newTile = k.add([
        "tile",

        { grid_x: x, grid_y: y},

        k.sprite(sprite),
        k.scale(6),
        k.pos(x*tileSize + offset, y*tileSize + offset),
        k.layer("ground"),
        k.anchor("center"),
        k.stay()
      ])

      // newTile.add([
      //   k.text(x + "," + y, { font: "pixel", size: 20 }),
      //   k.anchor("center")
      // ])

      tiles[x][y] = newTile;
    }
  }

  k.add([
    k.sprite("brambles"),
    k.scale(6),
    k.pos(k.center()),
    k.layer("ground"),
    k.anchor("center"),
    k.stay()
  ])

  return tiles;
}

export function gridManager(){
  return {
    id: "gridManager",
    grid_width: 8,
    grid_height: 8,
    tiles: [],
    add(){
      this.tiles = createGrid(this.grid_width, this.grid_height);
    },
    gridToWorld(x, y){
      return this.tiles[x][y].pos;
    }
  }
}