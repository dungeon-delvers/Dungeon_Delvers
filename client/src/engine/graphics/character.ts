import { Mesh } from '@babylonjs/core';

type CharacterType = 'PLAYER' | 'NPC';

type CharacterOptions = {
  name: string;
  type: CharacterType;
};

export class Character extends Mesh {
  #type: CharacterType;
  constructor(options: CharacterOptions) {
    super(options.name);
    this.#type = options.type;
  }

  get type() {
    return this.#type;
  }

  idle(key: number = 0) {
    const idleAnimations = this.animations?.find(animation => animation.name.includes('IDLE'));
    return idleAnimations ? idleAnimations[key] : undefined;
  }
}
