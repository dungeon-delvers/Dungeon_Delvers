import { Engine, Nullable, Scene } from '@babylonjs/core'
import {
  AdvancedDynamicTexture,
  Control,
  Rectangle,
  StackPanel,
  TextBlock,
} from '@babylonjs/gui'
import { colors } from './colors'
import { Cancel } from './Buttons'

export default class Menu extends Scene {
  private _menuId: string
  private _menu: AdvancedDynamicTexture
  private _error: StackPanel | null = null
  private _form: StackPanel
  private _formElements: Record<string, Control> = {}
  _goToCharacterSelect: () => void
  constructor(
    engine: Engine,
    menu_id: string
  ) {
    super(engine)
    this._menuId = menu_id
    this._menu = AdvancedDynamicTexture.CreateFullscreenUI(menu_id)
    this._form = new StackPanel(`${menu_id}_stack_panel`)
    this._form.width = '700px'
    this._form.isVertical = true
    this._form.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    this._form.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    this.createBackground(this._form)
    this._menu.addControl(this._form)
  }

  get form() {
    return this._form
  }

  set form(form: StackPanel) {
    this._form = form
  }

  get formElements() {
    return this._formElements
  }

  set formElements(elements: Record<string, Control>) {
    this._formElements = elements
    this.addFormElements()
  }

  addFormElements() {
    Object.values(this._formElements).map((element: Nullable<Control>) => {
      this._form.addControl(element)
    })
  }

  renderError(error: Error) {
    console.log(error)
    this._error = new StackPanel(`${this._menuId}_error_panel`)
    this._error.width = '500px'
    this._error.isVertical = true
    this.createBackground(this._error)
    const message = new TextBlock(`${this._menuId}_error_message`, error.message)
    message.color = colors.white.primary
    message.fontSize = '18px'
    message.textWrapping = true
    message.width = '100%'
    message.paddingLeft = '20px'
    message.paddingRight = '20px'
    message.height = '100px'
    const close = new Cancel(`${this._menuId}_error_close`, 'Close')
    close.onPointerUpObservable.add(() => {
      this.closeError()
    })
    close.width = '100px'
    this._error.addControl(message)
    this._error.addControl(close)
    this._menu.addControl(this._error)
  }

  closeError() {
    if (this._error) {
      this._error.dispose()
    }
  }

  createBackground(panel: StackPanel) {
    const background = new Rectangle(`${this._menuId}_background`)
    background.background = colors.gray[0]
    background.width = '100%'
    background.height = '100%'
    background.color = colors.gold.primary
    panel.addControl(background)
  }
}
