import { GroundMesh, MeshBuilder, Scene, StandardMaterial } from '@babylonjs/core';

export class Zone {
  private _scene: Scene;
  private _ground: GroundMesh;

  constructor(scene: Scene) {
    this._scene = scene;
    const subdivisions = 5;

    this._ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100, subdivisions }, scene);
    this._ground.position.y = 0;
    this._ground.material = new StandardMaterial('groundMaterial', scene);
  }

  public get scene(): Scene {
    return this._scene;
  }

  public get ground(): GroundMesh {
    return this._ground;
  }
}
