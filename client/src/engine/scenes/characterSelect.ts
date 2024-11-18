import { Engine, Nullable, Scene } from '@babylonjs/core'
import { Button, Cancel } from '../gui/components/Buttons'
import {
  AdvancedDynamicTexture,
  Control,
  Rectangle,
  StackPanel,
} from '@babylonjs/gui'
import { colors } from '../gui/components/colors'
import Menu from '../gui/components/Menu'

const menu_id = 'character_select_menu'

enum CHARACTER_ELEMENTS {
  CHARACTER_1 = `${menu_id}_character_1`,
  CHARACTER_2 = `${menu_id}_character_2`,
  CHARACTER_3 = `${menu_id}_character_3`,
  CHARACTER_4 = `${menu_id}_character_4`,
  CHARACTER_5 = `${menu_id}_character_5`,
  CHARACTER_6 = `${menu_id}_character_6`,
}

const LOGOUT = `${menu_id}_logout_button`

export default class CharacterSelect extends Menu {
  private _characterSelectFormElements = {
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
    [LOGOUT]: new Cancel(`${menu_id}_logout`, 'Logout'),
  }


  constructor(engine: Engine, _goToLogin: () => void) {
    super(engine, menu_id)
    this.formElements = this._characterSelectFormElements
    this.formElements[CHARACTER_ELEMENTS.CHARACTER_1].height = '80px'
    this.formElements[CHARACTER_ELEMENTS.CHARACTER_1].paddingTop = '20px'

    this.formElements[LOGOUT].onPointerUpObservable.add(() => {
      localStorage.removeItem('dd_auth')
      _goToLogin()
    })
  }
}
