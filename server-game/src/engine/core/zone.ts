import {
  GroundMesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
} from '@babylonjs/core';

export type ZoneType = {
  id: string;
  ground: GroundMesh;
  scene: Scene;
  name: string;
};

export class Zone implements ZoneType {
  #id: string;
  #name: string;
  #scene: Scene;
  #ground: GroundMesh;

  constructor(scene: Scene) {
    this.#scene = scene;
    const subdivisions = 5;

    this.#ground = MeshBuilder.CreateGround(
      'ground',
      { width: 100, height: 100, subdivisions },
      scene
    );
    this.#ground.position.y = 0;
    this.#ground.material = new StandardMaterial('groundMaterial', scene);
  }

  public get scene(): Scene {
    return this.#scene;
  }

  public get ground(): GroundMesh {
    return this.#ground;
  }

  public get id(): string {
    return this.#id;
  }
  public set id(inId: string) {
    this.#id = inId;
  }
  public get name(): string {
    return this.#name;
  }
  public set name(inName: string) {
    this.#name = inName;
  }
}
