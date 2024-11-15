import { Engine, Scene } from "@babylonjs/core"
import { AdvancedDynamicTexture, Control, StackPanel } from "@babylonjs/gui"
import LabeledInput from "../gui/components/LabeledInput"

export class RegisterScene extends Scene {
  private _menu: AdvancedDynamicTexture
  private _stackPanel: StackPanel
  constructor(engine: Engine) {
    super(engine)
    const menu_id = 'register_menu'
    this._menu = AdvancedDynamicTexture.CreateFullscreenUI(menu_id)
    this._stackPanel = new StackPanel(`${menu_id}_stack_panel`)
    this._stackPanel.isVertical = true
    this._stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    this._stackPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    this._menu.addControl(this._stackPanel)
    const usernameInput = new LabeledInput(`${menu_id}_username`, 'Username')
    this._stackPanel.addControl(usernameInput.label)
    this._stackPanel.addControl(usernameInput.input)
    const emailInput = new LabeledInput('email', 'Email')
    this._stackPanel.addControl(emailInput.label)
    this._stackPanel.addControl(emailInput.input)
    const passwordInput = new LabeledInput('password', 'Password')
    passwordInput.input.isPassword = true
    this._stackPanel.addControl(passwordInput.label)
    this._stackPanel.addControl(passwordInput.input)
    const registerButton = new Button('register', 'Register')
    registerButton.onPointerClickObservable.add(async () => {
      const username = usernameInput.value
      const email = emailInput.value
      const password = passwordInput.value
      const passwordHash = await generatePasswordHash(password)
      await createUser(email, passwordHash, username)
      this.sceneManager.start('login')
    })
    this._stackPanel.addControl(registerButton)
  }
}