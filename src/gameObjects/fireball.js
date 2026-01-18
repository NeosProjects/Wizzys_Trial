import { k } from "../kaplay";

export function createFireball(speed = 300, pos = k.center(), dir = k.Vec2.RIGHT){
  const gameManager = k.get("gameManager")[0];
  gameManager.score.value++;

  const fireball = k.add([
    "fireball",
    "attack",

    k.sprite("fireball"),
    k.scale(6),
    k.anchor("right"),
    k.pos(pos),
    k.move(dir, speed),
    k.health(1),
    k.offscreen({ destroy: true }),
    k.area({ isSensor: true, offset: new k.Vec2(1, 0),scale: new k.Vec2(0.3, 0.3) }),
    k.rotate(dir.angle())
  ])

  fireball.onDeath(() => {
    k.play("fireball", { volume: 0.5 });
    fireball.unuse("move");
    fireball.destroy();
  })

  return fireball;
}