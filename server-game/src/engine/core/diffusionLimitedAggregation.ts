import { Vector2 } from '@babylonjs/core';
import * as fs from 'fs';
import * as PImage from 'pureimage';

type GridKey = `${number}_${number}`;
type Grid = { [key in GridKey]: Coordinate };
type Coordinate = {
  loc: Vector2;
  particle: boolean;
};
type DLAPRops = {
  width: number;
  height: number;
  maxParticles?: number;
  seed?: Vector2;
};

export class DiffusionLimitedAggregation {
  #width: number;
  #height: number;
  #grid: Grid;
  #maxParticles: number;
  #currentLocation: Vector2;

  constructor({
    width,
    height,
    seed,
    maxParticles = Math.round(width * height * 0.05),
  }: DLAPRops) {
    this.#width = width;
    this.#height = height;
    this.#maxParticles = maxParticles;
    this.#grid = {};
    for (let x = 0; x < this.#width; x++) {
      for (let y = 0; y < this.#height; y++) {
        const loc = new Vector2(x, y);
        const key: GridKey = `${x}_${y}`;
        this.#grid[key] = {
          loc,
          particle: false,
        };
      }
    }
    this.#currentLocation =
      seed ?? new Vector2(Math.round(width * 0.5), Math.round(height * 0.5));
    const currentKey = `${this.#currentLocation.x}_${this.#currentLocation.y}`;
    if (this.#grid[currentKey]) {
      this.#grid[currentKey]!.particle = true;
    }

    this.populateParticles(); // Call the function to populate particles
  }

  /**
   * Populates the grid with particles up to the maxParticles limit.
   * Updates the color of random Coordinates to Color4(1, 1, 1).
   */
  private populateParticles(): void {
    let particleCount = 1;
    while (particleCount < this.#maxParticles) {
      const direction = [
        new Vector2(1, 0),
        new Vector2(-1, 0),
        new Vector2(0, 1),
        new Vector2(0, -1),
        new Vector2(1, 1),
        new Vector2(-1, -1),
        new Vector2(1, -1),
        new Vector2(-1, 1),
      ];
      const randomIndex = Math.floor(Math.random() * (direction.length - 1));
      this.#currentLocation.addInPlace(direction[randomIndex]);
      if (
        `${this.#currentLocation.x}_${this.#currentLocation.y}` in this.#grid
      ) {
        const { particle } =
          this.#grid[`${this.#currentLocation.x}_${this.#currentLocation.y}`];
        if (particle === false) {
          const key: GridKey = `${this.#currentLocation.x}_${this.#currentLocation.y}`;
          this.#grid[key]!.particle = true;
          this.#grid[key]!.loc = this.#currentLocation;
          particleCount++;
        }
      } else {
        // If the current location is out of bounds, reset it to a random position
        this.#currentLocation = new Vector2(
          Math.floor(Math.random() * this.#width),
          Math.floor(Math.random() * this.#height)
        );
      }
    }
  }

  get grid(): Grid {
    return this.#grid;
  }

  /**
   * Generates an image based on the grid.
   * @returns A Base64 string representing the grid as an image.
   */
  generateImage(fileName): void {
    const img1 = PImage.make(this.#width, this.#height);

    // get canvas context
    const ctx = img1.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get 2D context');
    }

    for (let x = 0; x < this.#width; x++) {
      for (let y = 0; y < this.#height; y++) {
        const key: GridKey = `${x}_${y}`;
        const coordinate = this.#grid[key];
        if (coordinate) {
          const { particle } = coordinate;

          ctx.fillStyle = particle ? 'white' : 'black';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    //write to 'out.png'
    PImage.encodePNGToStream(img1, fs.createWriteStream(`${fileName}.jpg`))
      .then(() => {
        console.log(`wrote out the png file to ${fileName}.jpg`);
      })
      .catch((e) => {
        console.log('there was an error writing', e);
      });
  }
}
