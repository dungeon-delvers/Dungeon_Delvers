import { Engine, FollowCamera, Scene, SceneLoader, SceneOptions, Vector3 } from '@babylonjs/core';

import CharacterCreateScene from '../../../../public/assets/models/character_create_scene.glb';
import { CharacterModels, CharacterModelsProps } from '../race/race';

export class CharacterScene extends Scene {
  #camera: FollowCamera;
  #autoRotate: boolean = false;
  #characters: CharacterModels;
  #selectedCharacter: keyof CharacterModelsProps = 'm_human';
  constructor(engine: Engine, sceneOptions?: SceneOptions) {
    super(engine, sceneOptions);
    const camera = new FollowCamera(`character_scene_camera`, new Vector3(0, 5, -5), this);
    camera.radius = 6;
    camera.heightOffset = 2;
    camera.fov = 1;
    // camera.lockedTarget = result.root;
    camera.upperRadiusLimit = 6;
    camera.lowerRadiusLimit = 3;
    camera.upperHeightOffsetLimit = 2;
    camera.lowerHeightOffsetLimit = 1;
    camera.maxCameraSpeed = 1;
    this.#camera = camera;
    this.loadSceneAssets();
    let alpha = 0;
    this.registerBeforeRender(() => {
      if (this.#autoRotate) {
        alpha += 0.025;
        this.#camera.rotationOffset = (18 * alpha) % 360;
      } else {
        this.#camera.rotationOffset = 0;
      }
    });
  }
  async loadSceneAssets() {
    const characterSceneResult = await SceneLoader.ImportMeshAsync(null, '', CharacterCreateScene, this);
    characterSceneResult.lights.forEach(light => {
      light.intensity = 20;
    });
    this.#characters = await CharacterModels.loadCharacterMeshes(this);
    this.#camera.lockedTarget = this.#characters.root;
    this.#characters.root.position = new Vector3(0, 0.85, 0);
    this.#characters.show(this.#selectedCharacter);
  }

  get camera() {
    return this.#camera;
  }

  set camera(camera: FollowCamera) {
    this.#camera = camera;
  }

  set autoRotate(autoRotate: boolean) {
    this.#autoRotate = autoRotate;
  }

  set selectedCharacter(selectedCharacter: keyof CharacterModelsProps) {
    this.#selectedCharacter = selectedCharacter;
    this.#characters.show(selectedCharacter);
    switch (selectedCharacter) {
      case 'f_dwarf':
      case 'f_goblin':
      case 'm_dwarf':
      case 'm_goblin':
        this.#camera.radius = 3;
        this.#camera.heightOffset = 1;
        break;
      case 'f_human':
      case 'f_orc':
      case 'm_human':
      case 'm_orc':
        this.#camera.radius = 6;
        this.#camera.heightOffset = 1.5;
        break;
    }
  }
}
