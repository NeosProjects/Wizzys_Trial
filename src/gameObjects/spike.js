import { k } from "../kaplay";

export function createSpike(pos, lifespan = 20){
  if(!pos) return;

  const gameManager = k.get("gameManager")[0];
  gameManager.score.value++;

  const spike = k.add([
    "spike",
    "attack",

    k.sprite("spike", {
      anim: "close"
    }),
    k.scale(6),
    k.timer(),
    k.pos(pos),
    k.health(1),
    k.anchor("center"),
    k.layer("background"),
  ])

  spike.wait(3, () => {
    spike.play("open");
    spike.use(k.area({ scale: 0.5, isSensor: true }));
    k.play("spike", { volume: 2 });
  })

  spike.wait(lifespan, () => {
    spike.destroy();
  })

  spike.onDeath(() => {
    spike.destroy();
  })

  return spike;
}