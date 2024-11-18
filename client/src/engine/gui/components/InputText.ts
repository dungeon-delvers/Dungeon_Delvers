import { InputText } from '@babylonjs/gui'
import { colors } from './colors'

export default class StyledInputText extends InputText {
  constructor(name: string) {
    super(name)
    this.color = colors.white.primary
    this.background = colors.black.primary
    this.focusedBackground = colors.black.primary
    this.focusedColor = colors.white.primary
    this.fontSize = 24
    this.height = '60px'
    this.width = '500px'
    this.paddingBottom = '20px'
    this.fontFamily = 'Goudy Bookletter'
  }
}
