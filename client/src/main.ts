import { Game } from './engine'
const fontName = 'Goudy Bookletter'
const font = new FontFace(
  fontName,
  'url(https://fonts.gstatic.com/s/goudybookletter1911/v19/sykt-z54laciWfKv-kX8krex0jDiD2HbY6IJshzWRYEHAQ.woff2)',
).loaded.then(font => {
  console.log('font loaded')
})

new Game()
