import {
  AdvancedDynamicTexture,
  Button,
  StackPanel,
  TextBlock,
} from '@babylonjs/gui'

import InputText from './components/InputText'
import InputPassword from './components/InputPassword'
import Label from './components/Label'

export const registerMenu = () => {
  const menuId = 'register_menu'
  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    menuId,
    true,
  )
  const title = new TextBlock(`${menuId}__title`, 'Dungeon Delvers')
  const fontName = 'Goudy Bookletter'
  const font = new FontFace(
    fontName,
    'url(https://fonts.gstatic.com/s/goudybookletter1911/v19/sykt-z54laciWfKv-kX8krex0jDiD2HbY6IJshzWRYEHAQ.woff2)',
  ).loaded.then(font => {
    console.log('font loaded')
  })
  title.fontFamily = fontName
  title.fontSize = 48
  title.width = '500px'
  title.color = '#ffffff'
  title.height = '150px'
  const username = new InputText('username')
  const usernameLabel = new Label(`${menuId}__username_label`, 'Username:')
  const email = new InputText(`${menuId}_email_input`)
  const emailLabel = new Label(`${menuId}_email_label`, 'Email:')
  const passwordLabel = new Label(`${menuId}_password_label`, 'Password:')
  const password = new InputPassword()
  const confirmPasswordLabel = new Label(
    `${menuId}__password_label`,
    'Confirm Password:',
  )
  const confirmPassword = new InputPassword()
  const register = Button.CreateSimpleButton(`${menuId}__register`, 'Register')
  register.width = '240px'
  register.height = '40px'
  register.color = '#ffffff'
  register.onPointerClickObservable.add(() => {
    const register = async () => {
      const response = await fetch(
        `${process.env.AUTH_SERVER_URL}${process.env.AUTH_SERVER_PORT ? `:${process.env.AUTH_SERVER_PORT}` : ''}/api/signup`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.text,
            username: username.text,
            password: password.text,
            passwordRepeat: confirmPassword.text,
          }),
        },
      )

      if (response.ok) {
        return await response.json()
      }
      if (response.status === 409) {
        const data = await response.json()
        if (data.message === 'Email already exists') {
          email.color = '#ff0000'
        } else if (data.message === 'Username already exists') {
          username.color = '#ff0000'
        }
      } else {
        alert('Failed to register')
      }
    }
    register().then(data => {
      if (data) {
        alert('Registered successfully')
      }
    })
  })
  // advancedTexture.addControl(title)
  const stack = new StackPanel('register_stack')
  stack.adaptHeightToChildren = true
  stack.addControl(title)
  stack.addControl(usernameLabel)
  stack.addControl(username)
  stack.addControl(emailLabel)
  stack.addControl(email)
  stack.addControl(passwordLabel)
  stack.addControl(password)
  stack.addControl(confirmPasswordLabel)
  stack.addControl(confirmPassword)
  stack.addControl(register)
  advancedTexture.addControl(stack)
}
