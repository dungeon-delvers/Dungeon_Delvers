import { Engine, Nullable, Scene } from '@babylonjs/core'
import {
  AdvancedDynamicTexture,
  Control,
  Rectangle,
  StackPanel,
} from '@babylonjs/gui'
import { colors } from './colors'

export default class Menu<T extends object> extends Scene {
  private _menu: AdvancedDynamicTexture
  private _form: StackPanel
  private _formElements: T
  _goToCharacterSelect: () => void
  constructor(
    engine: Engine,
    menu_id: string
  ) {
    super(engine)
    this._menu = AdvancedDynamicTexture.CreateFullscreenUI(menu_id)
    this._form = new StackPanel(`${menu_id}_stack_panel`)
    this._form.width = '700px'
    this._form.isVertical = true
    this._form.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    this._form.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    const background = new Rectangle(`${menu_id}_background`)
    background.background = colors.gray[0]
    background.width = '100%'
    background.height = '100%'
    background.color = colors.gold.primary
    this._form.addControl(background)
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

  set formElements(elements: T) {
    this._formElements = elements
    this.addFormElements()
  }

  addFormElements() {
    Object.values(this._formElements).map((element: Nullable<Control>) => {
      this._form.addControl(element)
    })
  }
}
