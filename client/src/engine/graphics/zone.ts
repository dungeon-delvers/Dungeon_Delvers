import { Engine, LoadSceneAsync, Scene, SceneLoader } from '@babylonjs/core';

type ZoneOptions = {
  name: string;
  fileName: string;
};

export class Zone {
  #engine: Engine;
  #fileName: string;
  #name: string;
  public scene: Scene;
  constructor(engine: Engine, options: ZoneOptions) {
    this.#engine = engine;
    this.#fileName = options.fileName;
    this.#name = options.name;
    this.loadZone();
  }

  async loadZone() {
    try {
      this.scene = await LoadSceneAsync(
        `${process.env.SERVER_FILE_URL}:${process.env.SERVER_FILE_PORT}/models/zones/${this.#fileName}`,
        this.#engine,
      );
      this.scene.lights.forEach(light => {
        light.intensity = 20;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addActor(name: string) {
    try {
      const actor = await SceneLoader.AppendAsync(
        `${process.env.SERVER_FILE_URL}:${process.env.SERVER_FILE_PORT}/models/actors/`,
        name,
        this.scene,
      );
      return actor;
    } catch (error) {
      console.error(error);
    }
  }

  get name() {
    return this.#name;
  }
}
