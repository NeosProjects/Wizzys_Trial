import { k } from "../kaplay";

export function createBomb(pos){
  if(!pos) return;

  const gameManager = k.get("gameManager")[0];
  gameManager.score.value++;

  const bomb = k.add([
    "bomb",
    
    k.sprite("bomb", { anim: "explode" }),
    k.scale(6),
    k.pos(pos),
    k.anchor("center"),
    k.timer(),
    k.layer("background"),
  ])

  bomb.wait(2.05, () => {
    bomb.destroy();
    emitter.emit(100);
    k.play("bomb");

    const player = k.get("player")[0];
    if (!player) return;
    
    const playerDist = bomb.pos.dist(player.pos);
    if (playerDist < 170){
      player.hp--;
      console.log(player.hp)
    }
  })

  const emitter = k.add([
    k.pos(pos),
    k.particles({
      max: 500,
      speed: [500, 1200],
      lifeTime: [0.75,1.8],
      angle: [0, 360],
      opacities: [1.0, 0.0],
      damping: [10, 10],
      scales: [6, 6],
      texture: k.getSprite("smoke").data.tex,
      quads: k.getSprite("smoke").data.frames,
    }, {
      direction: 0,
      spread: 360,
    }),
  ])

  return bomb;
}