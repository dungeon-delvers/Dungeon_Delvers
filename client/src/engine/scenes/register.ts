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
import { Accept, Cancel } from '../gui/components/Buttons'
import { colors } from '../gui/components/colors'

const menu_id = 'register_menu'

enum INPUT_ELEMENTS {
  EMAIL = `${menu_id}_email_input`,
  USERNAME = `${menu_id}_username_input`,
  PASSWORD = `${menu_id}_password_input`,
  CONFIRMATION = `${menu_id}_confirmation_input`,
}
enum LABEL_ELEMENTS {
  EMAIL_LABEL = `${menu_id}_email_label`,
  USERNAME_LABEL = `${menu_id}_username_label`,
  PASSWORD_LABEL = `${menu_id}_password_label`,
  CONFIRMATION_LABEL = `${menu_id}_confirmation_label`,
}

const REGISTER = `${menu_id}_register_button`
const CANCEL = `${menu_id}_cancel_button`

export default class RegisterScene extends Scene {
  private _menu: AdvancedDynamicTexture
  private _stackPanel: StackPanel
  private _currentInput: INPUT_ELEMENTS
  private _formElements: {
    [LABEL_ELEMENTS.EMAIL_LABEL]: Label
    [INPUT_ELEMENTS.EMAIL]: InputText
    [LABEL_ELEMENTS.USERNAME_LABEL]: Label
    [INPUT_ELEMENTS.USERNAME]: InputText
    [LABEL_ELEMENTS.PASSWORD_LABEL]: Label
    [INPUT_ELEMENTS.PASSWORD]: InputPassword
    [LABEL_ELEMENTS.CONFIRMATION_LABEL]: Label
    [INPUT_ELEMENTS.CONFIRMATION]: InputPassword
    [REGISTER]: Accept
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
    this._currentInput = INPUT_ELEMENTS.EMAIL
    this._formElements = {
      [LABEL_ELEMENTS.EMAIL_LABEL]: new Label('email_label', 'Email:'),
      [INPUT_ELEMENTS.EMAIL]: new InputText(`${menu_id}_email_input`),
      [LABEL_ELEMENTS.USERNAME_LABEL]: new Label('username_label', 'Username:'),
      [INPUT_ELEMENTS.USERNAME]: new InputText(`${menu_id}_username_input`),
      [LABEL_ELEMENTS.PASSWORD_LABEL]: new Label('password_label', 'Password:'),
      [INPUT_ELEMENTS.PASSWORD]: new InputPassword(`${menu_id}_password_input`),
      [LABEL_ELEMENTS.CONFIRMATION_LABEL]: new Label(
        'confirmation_label',
        'Confirm Password:',
      ),
      [INPUT_ELEMENTS.CONFIRMATION]: new InputPassword(
        `${menu_id}_confirmation_input`,
      ),
      [REGISTER]: new Accept('register_button', 'Register'),
      [CANCEL]: new Cancel('cancel_button', 'Cancel'),
    }
    console.log(this._formElements[INPUT_ELEMENTS.PASSWORD])
    this._formElements[REGISTER].isEnabled = false
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
    this._formElements[REGISTER].onPointerUpObservable.add(async () => {
      this.register()
    })
    this._formElements[CANCEL].onPointerUpObservable.add(() => {
      _goToLogin()
    })
  }
  private validateInputs() {
    this._formElements[REGISTER].isEnabled = Object.values(
      INPUT_ELEMENTS,
    ).reduce((accumulator, value) => {
      const input = this._formElements[value]

      if (input) {
        accumulator = input.text !== ''
      }
      return accumulator
    }, false)
  }
  private async register() {
    const response = await fetch(
      `${process.env.AUTH_SERVER_URL}${process.env.AUTH_SERVER_PORT ? `:${process.env.AUTH_SERVER_PORT}` : ''}/api/signup`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this._formElements[INPUT_ELEMENTS.EMAIL].text,
          username: this._formElements[INPUT_ELEMENTS.USERNAME].text,
          password: this._formElements[INPUT_ELEMENTS.PASSWORD].text,
          passwordRepeat: this._formElements[INPUT_ELEMENTS.CONFIRMATION].text,
        }),
      },
    )

    if (response.ok) {
      const result = await response.json()
      alert('Registration successful')
    }
    if (response.status === 409) {
      const data = await response.json()
      if (data.message === 'Email already exists') {
        this._formElements[INPUT_ELEMENTS.EMAIL].color = colors.red.primary
      } else if (data.message === 'Username already exists') {
        this._formElements[INPUT_ELEMENTS.USERNAME].color = colors.red.primary
      }
    } else if (!response.ok) {
      alert('Registration error')
    }
  }
}