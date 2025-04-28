import {
  Engine,
  FloatArray,
  FreeCamera,
  HemisphericLight,
  IndicesArray,
  MeshBuilder,
  NullEngine,
  Scene,
  SceneSerializer,
  Vector3,
  VertexBuffer,
  VertexData,
} from '@babylonjs/core';
import { createNoise3D } from 'simplex-noise';

export class Zone {
  #camera: FreeCamera;
  #engine: Engine;
  #light: HemisphericLight;
  #scene: Scene;
  constructor() {
    this.#engine = new NullEngine();
    this.#scene = new Scene(this.#engine);
    this.#camera = new FreeCamera('camera', new Vector3(0, 5, -10), this.#scene);
    // This targets the camera to scene origin
    this.#camera.setTarget(Vector3.Zero());
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    this.#light = new HemisphericLight('light', new Vector3(0, 1, 0), this.#scene);

    // Default intensity is 1. Let's dim the light a small amount
    this.#light.intensity = 0.7;
    const subdivisions = 70;
    const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100, subdivisions }, this.#scene);
    const noise3D = createNoise3D();
    const indices = ground.getIndices();
    let normals = [];
    const positions = ground.getVerticesData(VertexBuffer.PositionKind);
    if (positions) {
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        let y = positions[i + 1];
        const z = positions[i + 2];

        // Perform operations with vertex coordinates (x, y, z)
        const scale = 0.1; // Adjust scale to control the noise frequency
        const amplitude = 5; // Adjust amplitude to control the height variation
        const smoothness = 0.3; // Adjust smoothness to control the sharpness of the terrain
        const noiseValue = noise3D(x * scale, y * scale, z * scale);
        positions[i + 1] = y + noiseValue * amplitude * smoothness;
      }
      ground.setVerticesData(VertexBuffer.PositionKind, positions);
      VertexData.ComputeNormals(positions, indices, normals);
      ground.setVerticesData(VertexBuffer.NormalKind, normals);
      ground.setIndices(indices as IndicesArray, (indices as IndicesArray).length);
    }
  }

  async serializeScene(): Promise<any> {
    return SceneSerializer.SerializeAsync(this.#scene);
  }

  get camera(): FreeCamera {
    return this.#camera;
  }

  set camera(camera: FreeCamera) {
    this.#camera = camera;
  }

  get scene(): Scene {
    return this.#scene;
  }

  get positions(): FloatArray {
    const groundMesh = this.#scene.getMeshById('ground');
    const positions = groundMesh ? groundMesh.getVerticesData(VertexBuffer.PositionKind) : null;
    if (positions) {
      return positions;
    }
    return [];
  }
}
