import { Engine } from '@babylonjs/core'
import InputText from '../gui/components/InputText'
import InputPassword from '../gui/components/InputPassword'
import Label from '../gui/components/Label'
import { Accept, Button } from '../gui/components/Buttons'
import Menu from '../gui/components/Menu'
import { InputElements } from '../gui/components/types'

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

const formElements = {
  [LABEL_ELEMENTS.USERNAME_LABEL]: new Label(LABEL_ELEMENTS.USERNAME_LABEL, 'Username:'),
  [INPUT_ELEMENTS.USERNAME]: new InputText(INPUT_ELEMENTS.USERNAME),
  [LABEL_ELEMENTS.PASSWORD_LABEL]: new Label(LABEL_ELEMENTS.PASSWORD_LABEL, 'Password:'),
  [INPUT_ELEMENTS.PASSWORD]: new InputPassword(INPUT_ELEMENTS.PASSWORD),
  [LOGIN]: new Accept(LOGIN, 'Login'),
  [REGISTER]: new Button(REGISTER, 'Register'),
}

export default class LoginScene extends Menu<typeof formElements> {
  _goToCharacterSelect: () => void
  constructor(
    engine: Engine,
    _goToRegister: () => void,
    goToCharacterSelect: () => void,
  ) {
    super(engine, menu_id)
    this.formElements = formElements
    this._goToCharacterSelect = goToCharacterSelect
    this.formElements[LOGIN].isEnabled = false
    Object.values(INPUT_ELEMENTS).map(value => {
      const input = this.formElements[value]
      input &&
        input.onBlurObservable.add(() => {
          this.validateInputs()
        })
    })
    this.formElements[LOGIN].onPointerUpObservable.add(async () => {
      this.login()
    })
    this.formElements[REGISTER].onPointerUpObservable.add(() => {
      _goToRegister()
    })
  }
  private validateInputs() {
    this.formElements[LOGIN].isEnabled = Object.values(INPUT_ELEMENTS).reduce(
      (accumulator, value) => {
        const input = this.formElements[value] as InputElements

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
          username: this.formElements[INPUT_ELEMENTS.USERNAME].text,
          password: this.formElements[INPUT_ELEMENTS.PASSWORD].text,
        }),
      },
    )

    if (response.ok) {
      localStorage.setItem('dd_auth', await response.json())
      this._goToCharacterSelect()
    } else {
      const { message } = await response.json()
      console.log(message)
      const error = new Error(message)
      error.name = 'LOGIN_ERROR'
      this.renderError(error)
    }
  }
}
