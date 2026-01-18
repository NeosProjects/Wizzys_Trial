import { k } from "../kaplay";

import { createFireball } from "../gameObjects/fireball";

import { attacks } from "../data/attacks";

export function spawnManager(){
  return {
    id: "spawnManager",
    spawn_loopTime: 1,
    wave: 0,

    score: {
      value: 0,
      lastValue: 0,
      text_ui: null,
      scale: 1.5
    },

    spawning: false,
    canSpawn: false,
    occupied: [],
    add(){
      this.score.text_ui = k.add([
        k.text(this.score.value, { size: 40 }),
        k.pos(k.width() / 2, 24),
        k.anchor("top"),
        k.scale(this.score.scale),
        k.layer("ui"),
        k.stay()
      ])
    },
    update(){
      this.updateScore();

      if (this.spawning || !this.canSpawn) return;
      this.spawning = true;

      k.wait(this.spawn_loopTime, () => {
        this.spawning = false;
        this.wave++;
        
        const avaiableAttacks = attacks.filter((a) => this.wave >= a.from && (this.wave <= a.to || a.to == null));
        if (avaiableAttacks.length > 0) avaiableAttacks[k.randi(0, avaiableAttacks.length)].performAttack();

        for (let i = 0; i < this.occupied.length; i++){
          const space = this.occupied[i];
          space.gameObject.onDestroy(() => {
            this.occupied = this.occupied.filter(o => o !== space);
          });
        }

        if (this.wave >= 150) this.spawn_loopTime = 0.8;
        else if (this.wave >= 300) this.spawn_loopTime = 0.6;
        else this.spawn_loopTime = 1;
      })
    },
    async updateScore(){
      if(this.score.lastValue == this.score.value) return;

      if(!this.canSpawn) { this.score.value = this.score.lastValue; return;}

      let best = k.getData("best");
      if (!best) best = 0;

      if (this.score.value > best){
        k.setData("best", this.score.value);
      }

      this.score.text_ui.text = this.score.value;

      k.tween(this.score.scale + 0.2, this.score.scale, 0.3, (p) => this.score.text_ui.scaleTo(p)).onEnd(() => {
        this.score.scale += 0.01;
        if(this.score.scale > 2.5) this.score.scale = 2.5;
      });

      this.score.lastValue = this.score.value;
    },
    randomGridPos: randomGridPos,
    randomDir: randomDir,
    createFireballWall: createFireballWall,
    createDoubleFireballWall: createDoubleFireballWall,
  }
}

function randomDir(axis){
  let dirs = [k.Vec2.LEFT, k.Vec2.UP, k.Vec2.RIGHT, k.Vec2.DOWN];

  if (axis == 'x') dirs = [k.Vec2.LEFT, k.Vec2.RIGHT];
  else if (axis == 'y') dirs = [k.Vec2.UP, k.Vec2.DOWN];

  return dirs[k.randi(dirs.length)];
}

function randomGridPos(){
  const gameManager = k.get("gameManager")[0];
  const occupied = gameManager.occupied;

  let pos;
  let isOccupied;
  let tries = 0;

  do {
    const randomX = k.randi(0, gameManager.grid_width);
    const randomY = k.randi(0, gameManager.grid_height);
    pos = gameManager.gridToWorld(randomX, randomY);

    isOccupied = occupied.some(o =>
      o.pos && o.pos.x === pos.x && o.pos.y === pos.y
    );
    tries++;

    if (tries >= 50) break;
  } while (isOccupied);

  return pos;
}

function createDoubleFireballWall(fireballNumber){
  const xDir = randomDir('x');
  const yDir = randomDir('y');

  createFireballWall(fireballNumber, xDir);
  createFireballWall(fireballNumber, yDir);
}

function createFireballWall(fireballNumber, dir){
  k.play("fireball", { volume: 0.5 });

  const gameManager = k.get("gameManager")[0];

  if (fireballNumber > 7) fireballNumber = 7;
  
  const choosedPos = [];
  while (choosedPos.length < fireballNumber){
    const idx = k.randi(0, gameManager.grid_width);

    if (!choosedPos.includes(idx)) choosedPos.push(idx);
  }

  for (let i = 0; i < fireballNumber; i++){
    let x = 0;
    let y = 0;

    switch (dir){
      case k.Vec2.RIGHT:
        y = gameManager.gridToWorld(0, choosedPos[i]).y;
        x = 0;
        break;
      case k.Vec2.LEFT:
        y = gameManager.gridToWorld(0, choosedPos[i]).y;
        x = k.width();
        break;
      case k.Vec2.UP:
        x = gameManager.gridToWorld(choosedPos[i], 0).x;
        y = k.height();
        break;
      case k.Vec2.DOWN:
        x = gameManager.gridToWorld(choosedPos[i], 0).x;
        y = 0;
        break;
    }

    createFireball(300, new k.Vec2(x, y), dir);
  }
}