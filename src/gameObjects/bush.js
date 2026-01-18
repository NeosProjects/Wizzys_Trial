import { k } from "../kaplay";

export function createBush(){
  const randomScale = k.rand(0.5, 2) + 2;
  const randomFlip = k.randi() == 0 ? true : false;
  const randPos = randomPos();
  console.log(randPos);

  const bush = k.add([
    k.sprite("bush", { flipX: randomFlip }),
    k.scale(randomScale),
    k.pos(randPos),
    k.anchor("bot"),
    k.layer("ground"),
    k.stay()
  ])

  return bush;
}

function randomPos() {
  const leftBound = 100;
  const rightBound = 100;
  const topBound = 150;
  const bottomBound = 100;
  let x, y;

  if (k.randi(0, 2) === 0) {
    // x dans les bords, y totalement aléatoire
    if (k.randi(0, 2) === 0) {
      x = k.randi(0, leftBound + 1);
    } else {
      x = k.randi(k.width() - rightBound, k.width() + 1);
    }
    y = k.randi(0, k.height() + 1);
  } else {
    // y dans les bords, x totalement aléatoire
    if (k.randi(0, 2) === 0) {
      y = k.randi(0, topBound + 1);
    } else {
      y = k.randi(k.height() - bottomBound, k.height() + 1);
    }
    x = k.randi(0, k.width() + 1);
  }

  return new k.Vec2(x, y);
}