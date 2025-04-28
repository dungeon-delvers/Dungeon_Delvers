import { Color4, Vector2 } from '@babylonjs/core';
import * as fs from 'fs';

import { DiffusionLimitedAggregation } from './diffusionLimitedAggregation';

// jest.mock('fs');

const createGrid = (width = 5, height = 5) => {
  return new DiffusionLimitedAggregation({ width, height });
};

describe('DiffusionLimitedAggregation', () => {
  it('should create a grid of 1024 x 1024', () => {
    const dla = createGrid(1024, 1024);
    expect(Object.keys(dla.grid).length).toBe(1024 * 1024);
    const lastValue = Object.values(dla.grid).pop();
    expect(lastValue?.loc).toEqual(new Vector2(1023, 1023));
  });

  it('should create an image', () => {
    const dla = createGrid(1024, 1024);
    dla.generateImage('test');
    const image = fs.readFileSync('test');
    expect(image).toBeTruthy();
  });

  // it('should set the initial particle color to Color4(1, 1, 1)', () => {
  //   const dla = createGrid();
  //   const initialParticle = dla.grid[dla.initialParticle];
  //   expect(initialParticle?.color).toEqual(new Color4(1, 1, 1));
  // });

  // Add more tests for other methods as needed
});
