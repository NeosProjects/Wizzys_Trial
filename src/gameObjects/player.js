import { k } from "../kaplay";

function checkGridLimits(player){
  const gameManager = k.get("gameManager")[0];

  // Check limits
  if (player.grid_x > gameManager.grid_width - 1) player.grid_x = gameManager.grid_width - 1;
  if (player.grid_x < 0) player.grid_x = 0;
  if (player.grid_y > gameManager.grid_height - 1) player.grid_y = gameManager.grid_height - 1;
  if (player.grid_y < 0) player.grid_y = 0;
}

export function createPlayer(){
  // Init
  const player = k.add([
    "player",

    { grid_x: 3, grid_y: 3, isMoving: false, isInvicible: false },

    k.pos(k.center()), 
    k.layer("player"),
    k.sprite("player-o"),
    k.scale(6),
    k.anchor("bot"),
    k.health(3, 3),
    k.area({ isSensor: true, offset: new k.Vec2(0, 0),scale: new k.Vec2(0.3, 0.3) })
  ]);

  // Movement
  k.onKeyPress("right", () => {
    if (player.isMoving) return;

    player.grid_x++;
    player.flipX = false;
    checkGridLimits(player);
  })

  k.onKeyPress("left", () => {
    if (player.isMoving) return;

    player.grid_x--;
    player.flipX = true;
    checkGridLimits(player);
  })

  k.onKeyPress("down", () => {
    if (player.isMoving) return;

    player.grid_y++;
    checkGridLimits(player);
  })

  k.onKeyPress("up", () => {
    if (player.isMoving) return;

    player.grid_y--;
    checkGridLimits(player);
  })

  player.onUpdate(() => {
    const gameManager = k.get("gameManager")[0];

    const yOffset = 20;
    const worldPos = gameManager.gridToWorld(player.grid_x, player.grid_y).add(0, yOffset);
    const speed = 0.15;

    player.pos = player.pos.lerp(worldPos, speed);
    
    const tolerence = 30;
    if (player.pos.dist(worldPos) < tolerence) player.isMoving = false;
    else player.isMoving = true;
  })

  player.onCollide("attack", (attacker) => {
    if (player.isInvicible) return;
    player.isInvicible = true;

    const invicibilityTime = 0.5;
    k.wait(invicibilityTime, () => { player.isInvicible = false; })

    attacker.hp--;
    player.hp--;
  })

  player.onHurt(() => {
    k.play("hurt", { volume: 3 });
    k.tween(RED, WHITE, 0.15, (p) => player.color = p);
    k.tween(rand(-10, 10), 0, 0.15, (p) => player.angle = p);
  })

  player.onDeath(() => {
    const gameManager = k.get("gameManager")[0];
    gameManager.canSpawn = false;

    player.destroy();

    k.wait(3, () => {
      gameManager.score.text_ui.hidden = true;
      k.go("menu");
    })
  })

  return player;
}