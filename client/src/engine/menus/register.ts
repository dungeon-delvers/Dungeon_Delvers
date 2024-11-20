import InputText from '../gui/components/InputText'
import InputPassword from '../gui/components/InputPassword'
import Label from '../gui/components/Label'
import { Accept, Cancel } from '../gui/components/Buttons'
import { colors } from '../gui/components/colors'
import Menu from '../gui/components/Menu'

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

const ERROR = `${menu_id}_error_label`
const REGISTER = `${menu_id}_register_button`
const CANCEL = `${menu_id}_cancel_button`

export default class Register extends Menu {
  private _shouldRegister: boolean = false
  private _registerFormElements = {
    [ERROR]: new Label(ERROR, ''),
    [LABEL_ELEMENTS.EMAIL_LABEL]: new Label(
      LABEL_ELEMENTS.EMAIL_LABEL,
      'Email:',
    ),
    [INPUT_ELEMENTS.EMAIL]: new InputText(INPUT_ELEMENTS.EMAIL),
    [LABEL_ELEMENTS.USERNAME_LABEL]: new Label(
      LABEL_ELEMENTS.USERNAME_LABEL,
      'Username:',
    ),
    [INPUT_ELEMENTS.USERNAME]: new InputText(INPUT_ELEMENTS.USERNAME),
    [LABEL_ELEMENTS.PASSWORD_LABEL]: new Label(
      LABEL_ELEMENTS.PASSWORD_LABEL,
      'Password:',
    ),
    [INPUT_ELEMENTS.PASSWORD]: new InputPassword(INPUT_ELEMENTS.PASSWORD),
    [LABEL_ELEMENTS.CONFIRMATION_LABEL]: new Label(
      LABEL_ELEMENTS.CONFIRMATION_LABEL,
      'Confirm Password:',
    ),
    [INPUT_ELEMENTS.CONFIRMATION]: new InputPassword(
      `${menu_id}_confirmation_input`,
    ),
    [REGISTER]: new Accept(REGISTER, 'Register'),
    [CANCEL]: new Cancel(CANCEL, 'Cancel'),
  }
  constructor(_goToLogin: () => void) {
    super(menu_id, {
      width: '25%',
      height: '600px',
    })
    this.formElements = this._registerFormElements
    Object.values(INPUT_ELEMENTS).map(value => {
      const input = this.formElements[value]
      input &&
        input.onBlurObservable.add(() => {
          this.validateInputs()
        })
    })
    this.formElements[REGISTER].onPointerUpObservable.add(async () => {
      this.register()
    })
    this.formElements[CANCEL].onPointerUpObservable.add(() => {
      _goToLogin()
    })
  }
  private validateInputs() {
    this._shouldRegister = Object.values(INPUT_ELEMENTS).reduce(
      (accumulator, value) => {
        const input = this._registerFormElements[value]

        if (input) {
          accumulator = input.text !== ''
        }
        return accumulator
      },
      false,
    )
  }
  private async register() {
    if (!this._shouldRegister) {
      const error = new Error('Please fill out all fields')
      error.name = 'LOGIN_ERROR'
      this.renderError(error)
      return
    }
    const response = await fetch(
      `${process.env.AUTH_SERVER_URL}${process.env.AUTH_SERVER_PORT ? `:${process.env.AUTH_SERVER_PORT}` : ''}/api/signup`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this._registerFormElements[INPUT_ELEMENTS.EMAIL].text,
          username: this._registerFormElements[INPUT_ELEMENTS.USERNAME].text,
          password: this._registerFormElements[INPUT_ELEMENTS.PASSWORD].text,
          passwordRepeat:
            this._registerFormElements[INPUT_ELEMENTS.CONFIRMATION].text,
        }),
      },
    )

    if (response.ok) {
      const result = await response.json()
    }
    if (response.status === 409) {
      const data = await response.json()
      if (data.message === 'Email already exists') {
        this._registerFormElements[INPUT_ELEMENTS.EMAIL].color =
          colors.red.primary
      } else if (data.message === 'Username already exists') {
        this._registerFormElements[INPUT_ELEMENTS.USERNAME].color =
          colors.red.primary
      }
    } else if (!response.ok) {
    }
  }
}
