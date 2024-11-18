import {
  ArcRotateCamera,
  Engine,
  EngineFactory,
  Scene,
  Vector3,
} from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import '@babylonjs/loaders/glTF'

import RegisterScene from './scenes/register'
import LoginScene from './scenes/login'
import CharacterSelect from './scenes/characterSelect'

export enum GAME_STATE {
  LOGIN,
  REGISTER,
  // SERVER_SELECT,
  CHARACTER_SELECT,
  // CHARACTER_CREATION_RACE,
  // CHARACTER_CREATION_CLASS,
  // PLAYING,
}

export class Game {
  private _engine: Engine
  private _camera: ArcRotateCamera
  private _canvas: HTMLCanvasElement
  private _state: GAME_STATE
  private _scene: Scene
  private _scenes: Record<GAME_STATE, () => Scene>

  constructor() {
    this._canvas = this._createCanvas()
    // initialize babylon scene and engine
    this._init()
  }

  private async _init() {
    this._state = localStorage.getItem('dd_auth') ? GAME_STATE.CHARACTER_SELECT : GAME_STATE.LOGIN
    this._engine = (await EngineFactory.CreateAsync(
      this._canvas,
      undefined,
    )) as Engine
    this._scenes = {
      [GAME_STATE.LOGIN]: () => (
        new LoginScene(
          this._engine,
          () => this._changeScene(GAME_STATE.REGISTER),
          () => this._changeScene(GAME_STATE.CHARACTER_SELECT),
        )
      ),
      [GAME_STATE.REGISTER]: () => (
        new RegisterScene(this._engine, () =>
          this._changeScene(GAME_STATE.LOGIN),
        )
      ),
      [GAME_STATE.CHARACTER_SELECT]: () => (
        new CharacterSelect(this._engine, () =>
          this._changeScene(GAME_STATE.LOGIN),
        )
      ),
    }
    window.addEventListener('keydown', ev => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.key === 'I') {
        if (this._scene.debugLayer.isVisible()) {
          this._scene.debugLayer.hide()
        } else {
          this._scene.debugLayer.show()
        }
      }
    })
    this._scene = this._scenes[this._state]()
    this._camera = new ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      this._scene,
    )
    this._camera.attachControl(this._canvas, true)
    this._engine.runRenderLoop(() => {
      this._scene.render()
    })
  }

  private _sceneSetter(state: GAME_STATE) {
    this._scene.dispose()
    this._state = state
    this._scene = this._scenes[state]()
  }

  private _changeScene(state: GAME_STATE) {
    this._sceneSetter(state)
    this._engine.stopRenderLoop()

    this._camera = new ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      this._scene,
    )
    this._camera.attachControl(this._canvas, true)

    this._engine.runRenderLoop(() => {
      this._scene.render()
    })
  }

  private _createCanvas() {
    const canvas = document.createElement('canvas')
    canvas.id = 'renderCanvas'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    canvas.oncontextmenu = () => false
    canvas.id = 'game'
    document.body.appendChild(canvas)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    return canvas
  }
}
