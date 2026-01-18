import { k } from "../kaplay";
import { createPlayer } from "../gameObjects/player";

k.scene("game", async () => {
  const gameManager = k.get("gameManager")[0];
  gameManager.canSpawn = true;
  gameManager.score.text_ui.hidden = false;
  gameManager.score.value = 0;

  const player = createPlayer();

  let music = k.play("music", {
    loop: true,
    volume: 0.3,
  })

  k.loop(1, () => {
    if (music.volume >= 1) return;

    music.volume += 0.01;

    if (music.volume > 1) music.volume = 1;
  })
})