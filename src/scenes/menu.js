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

  k.add([
    k.text("Press space !", { size: 90, font: "pixel-o" }),
    k.pos(k.width()/ 2, k.height() - 250),
    k.anchor("bot")
  ])

  k.add([
    k.text("Wizzy' s\nTrial", { size: 200, font: "pixel-o", letterSpacing: -90 }),
    k.pos(k.center().add(0, -150)),
    k.anchor("center")
  ])

  k.add([
    k.sprite("player-o", { flipX: true }),
    k.anchor("center"),
    k.pos(k.center().add(130, -103)),
    k.scale(20)
  ])

  k.onKeyPress("space", () => {
    k.go("game");
  })
})