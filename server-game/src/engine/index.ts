export class GameEngine {
  private static instance: GameEngine;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): GameEngine {
    if (!GameEngine.instance) {
      GameEngine.instance = new GameEngine();
    }
    return GameEngine.instance;
  }

  public init() {
    console.log('Game engine initialized');
  }
}
