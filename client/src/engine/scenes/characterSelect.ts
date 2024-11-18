import { Engine, Nullable, Scene } from '@babylonjs/core'
import { Button, Cancel } from '../gui/components/Buttons'
import {
  AdvancedDynamicTexture,
  Control,
  Rectangle,
  StackPanel,
} from '@babylonjs/gui'
import { colors } from '../gui/components/colors'

const menu_id = 'character_select_menu'

enum CHARACTER_ELEMENTS {
  CHARACTER_1 = `${menu_id}_character_1`,
  CHARACTER_2 = `${menu_id}_character_2`,
  CHARACTER_3 = `${menu_id}_character_3`,
  CHARACTER_4 = `${menu_id}_character_4`,
  CHARACTER_5 = `${menu_id}_character_5`,
  CHARACTER_6 = `${menu_id}_character_6`,
}

const CANCEL = `${menu_id}_cancel_button`

export default class CharacterSelect extends Scene {
  private _menu: AdvancedDynamicTexture
  private _stackPanel: StackPanel
  private _formElements: {
    [CHARACTER_ELEMENTS.CHARACTER_1]: Button
    [CHARACTER_ELEMENTS.CHARACTER_2]: Button
    [CHARACTER_ELEMENTS.CHARACTER_3]: Button
    [CHARACTER_ELEMENTS.CHARACTER_4]: Button
    [CHARACTER_ELEMENTS.CHARACTER_5]: Button
    [CHARACTER_ELEMENTS.CHARACTER_6]: Button
    [CANCEL]: Cancel
  }
  constructor(engine: Engine, _goToLogin: () => void) {
    super(engine)
    this._menu = AdvancedDynamicTexture.CreateFullscreenUI(menu_id)
    this._stackPanel = new StackPanel(`${menu_id}_stack_panel`)
    this._stackPanel.width = '700px'
    this._stackPanel.isVertical = true
    this._stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    this._stackPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    const background = new Rectangle(`${menu_id}_background`)
    background.background = colors.gray[0]
    background.width = '100%'
    background.height = '100%'
    background.color = colors.gold.primary
    this._stackPanel.addControl(background)
    this._menu.addControl(this._stackPanel)
    this._formElements = {
      [CHARACTER_ELEMENTS.CHARACTER_1]: new Button(
        `${menu_id}_character_1`,
        'Character 1',
      ),
      [CHARACTER_ELEMENTS.CHARACTER_2]: new Button(
        `${menu_id}_character_2`,
        'Character 2',
      ),
      [CHARACTER_ELEMENTS.CHARACTER_3]: new Button(
        `${menu_id}_character_3`,
        'Character 3',
      ),
      [CHARACTER_ELEMENTS.CHARACTER_4]: new Button(
        `${menu_id}_character_4`,
        'Character 4',
      ),
      [CHARACTER_ELEMENTS.CHARACTER_5]: new Button(
        `${menu_id}_character_5`,
        'Character 5',
      ),
      [CHARACTER_ELEMENTS.CHARACTER_6]: new Button(
        `${menu_id}_character_6`,
        'Character 6',
      ),
      [CANCEL]: new Cancel('login_button', 'Logout'),
    }
    this._formElements[CHARACTER_ELEMENTS.CHARACTER_1].paddingTop = '20px'
    this._formElements[CHARACTER_ELEMENTS.CHARACTER_1].height = '80px'
    this._formElements[CANCEL].onPointerUpObservable.add(_goToLogin)
    Object.values(this._formElements).map((element: Nullable<Control>) => {
      this._stackPanel.addControl(element)
    })
  }
}
