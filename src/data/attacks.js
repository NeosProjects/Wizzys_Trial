import { k } from "../kaplay";

import { createSpike } from "../gameObjects/spike";
import { createBomb } from "../gameObjects/bomb";

const easy_attacks = [
  {
    from: 0,
    to: 15,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createFireballWall(1, gameManager.randomDir());
    }
  },
  {
    from: 10,
    to: 30,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createFireballWall(2, gameManager.randomDir());
    }
  },
  {
    from: 30,
    to: 150,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createFireballWall(3, gameManager.randomDir());
    }
  },
  {
    from: 10,
    to: 40,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createDoubleFireballWall(1);
    }
  },
  {
    from: 40,
    to: 80,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createDoubleFireballWall(2);
    }
  },
  {
    from: 80,
    to: 100,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createDoubleFireballWall(3);
    }
  },
  {
    from: 10,
    to: 50,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      const randomPos = gameManager.randomGridPos();

      const spike = createSpike(randomPos);
      gameManager.occupied.push({ gameObject: spike, pos: randomPos });
    }
  },
  {
    from: 50,
    to: 250,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];

      for (let i = 0; i < 2; i++){
        const randomPos = gameManager.randomGridPos();
  
        const spike = createSpike(randomPos);
        gameManager.occupied.push({ gameObject: spike, pos: randomPos });
      }
    }
  },
]

const medium_attacks = [
  {
    from: 100,
    to: 200,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];

      for (let i = 0; i < 1; i++){
        const randomPos = gameManager.randomGridPos();
  
        const bomb = createBomb(randomPos);
        gameManager.occupied.push({ gameObject: bomb, pos: randomPos });
      }
    }
  },
  {
    from: 200,
    to: 400,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];

      for (let i = 0; i < 2; i++){
        const randomPos = gameManager.randomGridPos();
  
        const bomb = createBomb(randomPos);
        gameManager.occupied.push({ gameObject: bomb, pos: randomPos });
      }
    }
  },
  {
    from: 100,
    to: 300,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createFireballWall(4, gameManager.randomDir());
    }
  },
  {
    from: 200,
    to: 600,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createFireballWall(5, gameManager.randomDir());
    }
  },
  {
    from: 130,
    to: 300,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createDoubleFireballWall(3, gameManager.randomDir());
    }
  },
]

const hard_attacks = [
  {
    from: 350,
    to: 500,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];

      for (let i = 0; i < 3; i++){
        const randomPos = gameManager.randomGridPos();
  
        const bomb = createBomb(randomPos);
        gameManager.occupied.push({ gameObject: bomb, pos: randomPos });
      }
    }
  },
  {
    from: 250,
    to: 500,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];

      for (let i = 0; i < 4; i++){
        const randomPos = gameManager.randomGridPos();
  
        const spike = createSpike(randomPos);
        gameManager.occupied.push({ gameObject: spike, pos: randomPos });
      }
    }
  },
  {
    from: 300,
    to: 600,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createDoubleFireballWall(4, gameManager.randomDir());
    }
  },
]

const impossible_attacks = [
  {
    from: 500,
    to: null,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];

      for (let i = 0; i < 4; i++){
        const randomPos = gameManager.randomGridPos();
  
        const bomb = createBomb(randomPos);
        gameManager.occupied.push({ gameObject: bomb, pos: randomPos });
      }
    }
  },
  {
    from: 500,
    to: null,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];

      for (let i = 0; i < 6; i++){
        const randomPos = gameManager.randomGridPos();
  
        const spike = createSpike(randomPos);
        gameManager.occupied.push({ gameObject: spike, pos: randomPos });
      }
    }
  },
  {
    from: 600,
    to: null,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createFireballWall(6, gameManager.randomDir());
    }
  },
  {
    from: 600,
    to: null,
    performAttack: () => {
      const gameManager = k.get("gameManager")[0];
      gameManager.createDoubleFireballWall(5, gameManager.randomDir());
    }
  },
]


export const attacks = [...easy_attacks, ...medium_attacks, ...hard_attacks, ...impossible_attacks];