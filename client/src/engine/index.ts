import {
  ArcRotateCamera,
  Engine,
  EngineFactory,
  Scene,
  Sound,
  Vector3,
} from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import '@babylonjs/loaders/glTF'

import titleMusic from '../../public/assets/audio/title.mp3'

import RegisterMenu from './menus/register'
import LoginMenu from './menus/login'
import CharacterMenu from './menus/characterSelect'
import { AdvancedDynamicTexture, Control } from '@babylonjs/gui'

export enum GAME_STATE {
  MAIN_MENU,
  CHARACTER_SELECT,
}

export enum MAIN_MENU_STATE {
  LOGIN,
  REGISTER,
  CHARACTER_SELECT,
}

export class Game {
  private _engine: Engine
  private _camera: ArcRotateCamera
  private _canvas: HTMLCanvasElement
  private _state: GAME_STATE
  private _menu: AdvancedDynamicTexture
  private _main_menu_state: MAIN_MENU_STATE
  private _main_menu_states: Record<MAIN_MENU_STATE, () => Control>
  private _scene: Scene
  private _scenes: Record<GAME_STATE, () => Scene>

  constructor() {
    this._canvas = this._createCanvas()
    // initialize babylon scene and engine
    this._init()
  }

  private async _init() {
    this._main_menu_state = localStorage.getItem('dd_auth')
      ? MAIN_MENU_STATE.CHARACTER_SELECT
      : MAIN_MENU_STATE.LOGIN
    console.log(this._canvas)
    this._engine = (await EngineFactory.CreateAsync(
      this._canvas,
      undefined,
    )) as Engine
    console.log(this._engine)
    this._scene = new Scene(this._engine)
    this._menu = AdvancedDynamicTexture.CreateFullscreenUI('main_menu')
    this._main_menu_states = {
      [MAIN_MENU_STATE.LOGIN]: () =>
        new LoginMenu(
          () => this._changeMenu(MAIN_MENU_STATE.REGISTER),
          () => this._changeMenu(MAIN_MENU_STATE.CHARACTER_SELECT),
        ),
      [MAIN_MENU_STATE.REGISTER]: () =>
        new RegisterMenu(() => this._changeMenu(MAIN_MENU_STATE.LOGIN)),
      [MAIN_MENU_STATE.CHARACTER_SELECT]: () =>
        new CharacterMenu(this._scene, () =>
          this._changeMenu(MAIN_MENU_STATE.LOGIN),
        ),
    }
    this._menu.addControl(this._main_menu_states[this._main_menu_state]())
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
    this._camera = new ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      this._scene,
    )
    this._camera.attachControl(this._canvas, true)
    new Sound('title_music', titleMusic.split(/[?#]/)[0], null, null, {
      autoplay: true,
      loop: true,
    })
    this._engine.runRenderLoop(() => {
      this._scene.render()
    })
  }

  private _menuSetter(state: MAIN_MENU_STATE) {
    this._menu.getChildren().forEach(child => {
      child.dispose()
    })
    this._main_menu_state = state
    console.log(this._main_menu_states[state])
    this._menu.addControl(this._main_menu_states[state]())
  }

  private _changeMenu(state: MAIN_MENU_STATE) {
    this._menuSetter(state)
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
