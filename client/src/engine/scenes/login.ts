import { Engine, Nullable, Scene } from '@babylonjs/core'
import {
  AdvancedDynamicTexture,
  Control,
  Rectangle,
  StackPanel,
} from '@babylonjs/gui'
import InputText from '../gui/components/InputText'
import InputPassword from '../gui/components/InputPassword'
import Label from '../gui/components/Label'
import { Accept, Button } from '../gui/components/Buttons'
import { colors } from '../gui/components/colors'

const menu_id = 'login_menu'

enum INPUT_ELEMENTS {
  USERNAME = `${menu_id}_username_input`,
  PASSWORD = `${menu_id}_password_input`,
}
enum LABEL_ELEMENTS {
  USERNAME_LABEL = `${menu_id}_username_label`,
  PASSWORD_LABEL = `${menu_id}_password_label`,
}

const LOGIN = `${menu_id}_login_button`
const REGISTER = `${menu_id}_cancel_button`

export default class LoginScene extends Scene {
  private _menu: AdvancedDynamicTexture
  private _stackPanel: StackPanel
  private _formElements: {
    [LABEL_ELEMENTS.USERNAME_LABEL]: Label
    [INPUT_ELEMENTS.USERNAME]: InputText
    [LABEL_ELEMENTS.PASSWORD_LABEL]: Label
    [INPUT_ELEMENTS.PASSWORD]: InputPassword
    [LOGIN]: Accept
    [REGISTER]: Button
  }
  _goToCharacterSelect: () => void
  constructor(
    engine: Engine,
    _goToRegister: () => void,
    goToCharacterSelect: () => void,
  ) {
    super(engine)
    this._goToCharacterSelect = goToCharacterSelect
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
      [LABEL_ELEMENTS.USERNAME_LABEL]: new Label('username_label', 'Username:'),
      [INPUT_ELEMENTS.USERNAME]: new InputText(`${menu_id}_username_input`),
      [LABEL_ELEMENTS.PASSWORD_LABEL]: new Label('password_label', 'Password:'),
      [INPUT_ELEMENTS.PASSWORD]: new InputPassword(`${menu_id}_password_input`),
      [LOGIN]: new Accept('register_button', 'Login'),
      [REGISTER]: new Button('cancel_button', 'Register'),
    }
    this._formElements[LOGIN].isEnabled = false
    Object.values(INPUT_ELEMENTS).map(value => {
      const input = this._formElements[value]
      input &&
        input.onBlurObservable.add(() => {
          this.validateInputs()
        })
    })
    Object.values(this._formElements).map((element: Nullable<Control>) => {
      this._stackPanel.addControl(element)
    })
    this._formElements[LOGIN].onPointerUpObservable.add(async () => {
      this.login()
    })
    this._formElements[REGISTER].onPointerUpObservable.add(() => {
      _goToRegister()
    })
  }
  private validateInputs() {
    this._formElements[LOGIN].isEnabled = Object.values(INPUT_ELEMENTS).reduce(
      (accumulator, value) => {
        const input = this._formElements[value]

        if (input) {
          accumulator = input.text !== ''
        }
        return accumulator
      },
      false,
    )
  }
  private async login() {
    const response = await fetch(
      `${process.env.AUTH_SERVER_URL}${process.env.AUTH_SERVER_PORT ? `:${process.env.AUTH_SERVER_PORT}` : ''}/api/login`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this._formElements[INPUT_ELEMENTS.USERNAME].text,
          password: this._formElements[INPUT_ELEMENTS.PASSWORD].text,
        }),
      },
    )

    if (response.ok) {
      this._goToCharacterSelect()
    } else if (response.ok) {
      alert('Login error')
    }
  }
}
