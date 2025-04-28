import { GameEngine } from '@/engine';

export default async () => {
  const gameEngine = GameEngine.getInstance();
  gameEngine.init();

  // Initialize other game-related components here
  // For example, you might want to load zones, players, etc.
};
