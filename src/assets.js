import { k } from "./kaplay";

k.loadRoot("./"); 

// Sprites
k.loadSprite("player", "sprites/player.png");
k.loadSprite("player-o", "sprites/player-o.png");
k.loadSprite("fireball", "sprites/fireball.png");
k.loadSprite("light_grass", "sprites/light_grass_tile.png");
k.loadSprite("dark_grass", "sprites/dark_grass_tile.png");
k.loadSprite("brambles", "sprites/brambles.png");
k.loadSprite("bush", "sprites/bush.png");
k.loadSprite("logo", "sprites/wizzy_logo_final.png");
k.loadSprite("spike", "sprites/spike.png", {
  sliceX: 2,
  sliceY: 1,
  anims: {
    close: { from: 0, to: 0, loop: true },
    open: { from: 1, to: 1, loop: true },
  },
});
k.loadSprite("bomb", "sprites/bomb.png", {
  sliceX: 5,
  sliceY: 1,
  anims: {
    explode: { from: 0, to: 4, loop: false, speed: 2 },
  },
});
k.loadSprite("smoke", "sprites/smoke.png", {
  sliceX: 3,
  sliceY: 1,
  anims: {
    disapear: { from: 0, to: 2, loop: false },
  },
});

// Fonts
k.loadBitmapFont("pixel", "fonts/happy.png", 28, 37);
k.loadBitmapFont("pixel-o", "fonts/happy-o.png", 36, 45);

// Sounds
k.loadSound("bomb", "sounds/bomb.wav");
k.loadSound("fireball", "sounds/fireball.wav");
k.loadSound("spike", "sounds/spike.wav");
k.loadSound("hurt", "sounds/hurt.wav");

// Music
k.loadMusic("music", "sounds/music.mp3");