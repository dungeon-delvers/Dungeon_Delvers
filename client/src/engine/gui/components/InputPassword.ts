import { InputPassword } from '@babylonjs/gui'

export default class StyledInputPassword extends InputPassword {
  constructor() {
    super()
    this.color = '#ffffff'
    this.fontSize = 24
    this.height = '60px'
    this.width = '500px'
    this.paddingBottom = '20px'
    this.fontFamily = 'Goudy Bookletter'
  }
}
