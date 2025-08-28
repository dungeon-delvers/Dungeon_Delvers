import {
  Engine,
  LoadSceneAsync,
  NullEngine,
  Scene,
  SceneSerializer,
} from '@babylonjs/core';

import LoggerInstance from '@/loaders/logger';

import '@babylonjs/loaders/glTF';
import { selectZoneById } from '@/queries/zone';

export type ZoneType = {
  fileName: string;
  id: number;
  initialize: () => Promise<void>;
  scene: Scene;
};

export class Zone implements ZoneType {
  get fileName(): string {
    return this.#fileName;
  }
  get id(): number {
    return this.#id;
  }
  get scene(): Scene {
    return this.#scene;
  }
  #engine: Engine;
  #fileName: string;
  #id: number;

  #scene: Scene;

  constructor(id: number, fileName: string) {
    this.#engine = new NullEngine();
    this.#scene = new Scene(this.#engine);
    this.#id = id;
    this.#fileName = fileName;
  }

  async initialize(): Promise<void> {
    const zoneUrl = `${process.env.SERVER_FILE_SERVICE}:${process.env.SERVER_FILE_PORT}/models/zones/${this.#fileName}.glb`;
    this.#scene = await LoadSceneAsync(`data:${zoneUrl}`, this.#engine);
    LoggerInstance.info(`Loading zone: ${this.#scene}`);
  }

  loadNPCs(): void {
    // Placeholder for loading NPCs logic
    LoggerInstance.info(`Loading NPCs for zone: ${this.#fileName}`);
  }

}

export const loadZoneById = (zoneId: number) => {
  return selectZoneById(zoneId)
}
