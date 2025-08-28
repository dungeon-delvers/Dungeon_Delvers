import { Engine, EngineFactory } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";

import { Game } from './engine';

const fontName = 'Goudy Bookletter';
new FontFace(
  fontName,
  'url(https://fonts.gstatic.com/s/goudybookletter1911/v19/sykt-z54laciWfKv-kX8krex0jDiD2HbY6IJshzWRYEHAQ.woff2)',
);

const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'renderCanvas';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.oncontextmenu = () => false;
  canvas.id = 'game';
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
};

const initializeGame = async () => {
  const canvas = createCanvas();
  const engine = (await EngineFactory.CreateAsync(canvas, undefined)) as Engine;
  new Game(engine);
};

initializeGame();
