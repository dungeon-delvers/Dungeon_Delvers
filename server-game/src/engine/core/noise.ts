import SimplexNoise from 'simplex-noise';

/**
 * Generates Perlin noise.
 * @param x - The x-coordinate.
 * @param y - The y-coordinate.
 * @param seed - The seed for the noise generator.
 * @returns The Perlin noise value.
 */
export function generatePerlinNoise(x: number, y: number, seed: string): number {
  const simplex = new SimplexNoise(seed);
  return (simplex.noise2D(x, y) + 1) / 2; // Normalize to range [0, 1]
}

/**
 * Generates Simplex noise.
 * @param x - The x-coordinate.
 * @param y - The y-coordinate.
 * @param seed - The seed for the noise generator.
 * @returns The Simplex noise value.
 */
export function generateSimplexNoise(x: number, y: number, seed: string): number {
  const simplex = new SimplexNoise(seed);
  return (simplex.noise2D(x, y) + 1) / 2; // Normalize to range [0, 1]
}

/**
 * Generates Anisotropic noise.
 * @param x - The x-coordinate.
 * @param y - The y-coordinate.
 * @param seed - The seed for the noise generator.
 * @param scaleX - The scale factor for the x-axis.
 * @param scaleY - The scale factor for the y-axis.
 * @returns The Anisotropic noise value.
 */
export function generateAnisotropicNoise(x: number, y: number, seed: string, scaleX: number, scaleY: number): number {
  const simplex = new SimplexNoise(seed);
  const scaledX = x * scaleX;
  const scaledY = y * scaleY;
  return (simplex.noise2D(scaledX, scaledY) + 1) / 2; // Normalize to range [0, 1]
}
