import { Vector2 } from '@babylonjs/core';

import { sat } from '../../../../../lib/math';
import NoiseGenerator from '../../../../../lib/noise';

class HeightGenerator {
  private radius: Array<number>;

  private generator: NoiseGenerator;

  constructor(generator: NoiseGenerator, minRadius: number, maxRadius: number) {
    this.radius = [minRadius, maxRadius];
    this.generator = generator;
  }

  Get(x: number, y: number) {
    const distance = new Vector2(x, y).length();
    let normalization = 1.0 - sat((distance - this.radius[0]) / (this.radius[1] - this.radius[0]));
    normalization = normalization * normalization * (3 - 2 * normalization);

    return [this.generator.Get(x, y), normalization];
  }
}

export default HeightGenerator;
