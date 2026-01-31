import { k } from "../kaplay";

import { createGameManager } from "../managers/gameManager";

k.scene("menu", () => {
  const gameManager = createGameManager();
  gameManager.score.text_ui.hidden = true;

  const best_text = k.add([
    k.text("Best: 0", { size: 56 }),
    k.pos(k.width()/ 2, 30),
    k.anchor("top")
  ])  

  const best = k.getData("best");
  if (best == 0 || !best) best_text.hidden = true;
  else best_text.text = "Best: " + best;

  const press_text = k.add([
    k.text("Press space !", { size: 70, font: "pixel-o" }),
    k.pos(k.center().add(0, 200)),
    k.anchor("top"),
    k.opacity(1)
  ])

  k.loop(2, () => {
    k.tween(1, 0, 0.5, (p) => press_text.opacity = p).onEnd(() => {
      k.tween(0, 1, 0.5, (p) => press_text.opacity = p);
    });
  })


  const base_pos = k.center().add(0, -120);
  const logo = k.add([
    k.sprite("logo"),
    k.pos(base_pos),
    k.anchor("center"),
    k.scale(3)
  ])

  k.loop(2, () => {
    k.tween(base_pos, base_pos.add(0, 15), 1, (p) => logo.pos = p, k.easings.easeInOutSine).onEnd(() => {
      k.tween(base_pos.add(0, 15), base_pos, 1, (p) => logo.pos = p, k.easings.easeInOutSine);
    });
  })

  // k.add([
  //   k.text("Wizzy' s\nTrial", { size: 200, font: "pixel-o", letterSpacing: -90 }),
  //   k.pos(k.center().add(0, -150)),
  //   k.anchor("center")
  // ])

  // k.add([
  //   k.sprite("player-o", { flipX: true }),
  //   k.anchor("center"),
  //   k.pos(k.center().add(130, -103)),
  //   k.scale(20)
  // ])

  k.onKeyPress("space", () => {
    k.go("game");
  })
})