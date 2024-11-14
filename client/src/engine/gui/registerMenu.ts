import {
  AdvancedDynamicTexture,
  Button,
  InputPassword,
  InputText,
  StackPanel,
  TextBlock,
} from '@babylonjs/gui'

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
  const emailLabel = new TextBlock(`${menuId}__email_label`, 'Email:')
  emailLabel.color = '#ffffff'
  emailLabel.height = '40px'
  const email = new InputText()
  email.color = '#ffffff'
  email.width = '500px'
  email.height = '40px'
  const usernameLabel = new TextBlock(`${menuId}__username_label`, 'Username:')
  usernameLabel.color = '#ffffff'
  usernameLabel.height = '40px'
  const username = new InputText()
  username.color = '#ffffff'
  username.width = '500px'
  username.height = '40px'
  const passwordLabel = new TextBlock(`${menuId}__password_label`, 'Password:')
  passwordLabel.color = '#ffffff'
  passwordLabel.height = '40px'
  const password = new InputPassword()
  password.width = '500px'
  password.height = '40px'
  password.color = '#ffffff'

  const confirmPasswordLabel = new TextBlock(
    `${menuId}__password_label`,
    'Confirm Password:',
  )
  confirmPasswordLabel.color = '#ffffff'
  confirmPasswordLabel.height = '40px'
  const confirmPassword = new InputPassword()
  confirmPassword.width = '500px'
  confirmPassword.height = '40px'
  confirmPassword.color = '#ffffff'
  const register = Button.CreateSimpleButton(`${menuId}__register`, 'Register')
  register.width = '240px'
  register.height = '40px'
  register.onPointerClickObservable.add(() => {
    const login = async () => {
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
      } else {
        alert('Failed to register')
      }
    }
    login().then(data => {
      if (data) {
        alert('Registered successfully')
      }
    })
  })
  // advancedTexture.addControl(title)
  const stack = new StackPanel('register_stack')
  stack.adaptHeightToChildren = true
  stack.addControl(title)
  stack.addControl(emailLabel)
  stack.addControl(email)
  stack.addControl(usernameLabel)
  stack.addControl(username)
  stack.addControl(passwordLabel)
  stack.addControl(password)
  stack.addControl(confirmPasswordLabel)
  stack.addControl(confirmPassword)
  stack.addControl(register)
  advancedTexture.addControl(stack)
}
