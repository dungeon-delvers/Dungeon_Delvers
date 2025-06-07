import LoggerInstance from '@/loaders/logger';
import {
  Engine,
  LoadSceneAsync,
  NullEngine,
  Scene,
  SceneSerializer,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

export type ZoneType = {
  fileName: string;
  id: number;
  scene: Scene;
  initialize: () => Promise<void>;
  serializeScene: () => Promise<any>;
};

export class Zone implements ZoneType {
  #engine: Engine;
  #scene: Scene;
  #id: number;
  #fileName: string;
  constructor(id: number, fileName: string) {
    this.#engine = new NullEngine();
    this.#scene = new Scene(this.#engine);
    this.#id = id;
    this.#fileName = fileName;
  }
  get id(): number {
    return this.#id;
  }

  get fileName(): string {
    return this.#fileName;
  }

  async initialize(): Promise<void> {
    const zoneUrl = `${process.env.SERVER_FILE_SERVICE}:${process.env.SERVER_FILE_PORT}/models/zones/${this.#fileName}.glb`;
    this.#scene = await LoadSceneAsync(`data:${zoneUrl}`, this.#engine);
    LoggerInstance.info(`Loading zone: ${this.#scene}`);
  }

  async serializeScene(): Promise<any> {
    return SceneSerializer.SerializeAsync(this.#scene);
  }

  get scene(): Scene {
    return this.#scene;
  }
}
