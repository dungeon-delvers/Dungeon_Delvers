import InputText from '../gui/components/InputText';
import InputPassword from '../gui/components/InputPassword';
import Label from '../gui/components/Label';
import { Accept, Button } from '../gui/components/Buttons';
import Menu from '../gui/components/Menu';
import { InputElements } from '../gui/components/types';
import Title from '../gui/components/Title';
import { AdvancedDynamicTexture } from '@babylonjs/gui';

const menu_id = 'login_menu';

enum INPUT_ELEMENTS {
  USERNAME = `${menu_id}_username_input`,
  PASSWORD = `${menu_id}_password_input`,
}
enum LABEL_ELEMENTS {
  USERNAME_LABEL = `${menu_id}_username_label`,
  PASSWORD_LABEL = `${menu_id}_password_label`,
}

const TITLE = `${menu_id}_title`;
const LOGIN = `${menu_id}_login_button`;
const REGISTER = `${menu_id}_cancel_button`;

export default class Login extends Menu {
  _goToCharacterSelect: () => void;
  _shouldLogin: boolean = false;
  private _loginFormElements = {
    [TITLE]: new Title(TITLE, 'Dungeon Delvers'),
    [LABEL_ELEMENTS.USERNAME_LABEL]: new Label(LABEL_ELEMENTS.USERNAME_LABEL, 'Username:'),
    [INPUT_ELEMENTS.USERNAME]: new InputText(INPUT_ELEMENTS.USERNAME),
    [LABEL_ELEMENTS.PASSWORD_LABEL]: new Label(LABEL_ELEMENTS.PASSWORD_LABEL, 'Password:'),
    [INPUT_ELEMENTS.PASSWORD]: new InputPassword(INPUT_ELEMENTS.PASSWORD),
    [LOGIN]: new Accept(LOGIN, 'Login'),
    [REGISTER]: new Button(REGISTER, 'Register'),
  };
  constructor(texture: AdvancedDynamicTexture, _goToRegister: () => void, goToCharacterSelect: () => void) {
    super(menu_id, { width: '25%', height: '450px' });
    this.formElements = this._loginFormElements;
    this._goToCharacterSelect = goToCharacterSelect;
    Object.values(INPUT_ELEMENTS).map(value => {
      const input = this.formElements[value];
      input &&
        input.onBlurObservable.add(() => {
          this.validateInputs();
        });
    });
    (this.formElements[LOGIN] as Button).onClick = () => this.login();
    (this.formElements[REGISTER] as Button).onClick = () => _goToRegister();
    // texture.focusedControl = this._loginFormElements[INPUT_ELEMENTS.USERNAME]
  }
  private validateInputs() {
    this._shouldLogin = Object.values(INPUT_ELEMENTS).reduce((accumulator, value) => {
      const input = this.formElements[value] as InputElements;

      if (input) {
        accumulator = input.text !== '';
      }
      return accumulator;
    }, false);
  }
  private async login() {
    if (!this._shouldLogin) {
      const error = new Error('Please fill out all fields');
      error.name = 'LOGIN_ERROR';
      this.renderError(error);
      return;
    }
    const response = await fetch(
      `${process.env.AUTH_URL}${process.env.AUTH_PORT ? `:${process.env.AUTH_PORT}` : ''}/api/login`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this._loginFormElements[INPUT_ELEMENTS.USERNAME].text,
          password: this._loginFormElements[INPUT_ELEMENTS.PASSWORD].text,
        }),
      },
    );

    if (response.ok) {
      localStorage.setItem('dd_auth', await response.json());
      this._goToCharacterSelect();
      Object.values(INPUT_ELEMENTS).map(value => {
        const input = this._loginFormElements[value];
        if (input) {
          input.text = '';
        }
      });
    } else {
      const { message } = await response.json();
      console.log(message);
      const error = new Error(message);
      error.name = 'LOGIN_ERROR';
      this.renderError(error);
    }
  }
}
