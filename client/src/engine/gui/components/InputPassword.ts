import { InputPassword } from '@babylonjs/gui'
import { colors } from './colors'

type InputPasswordOptions = {
  color: string
  background: string
  focusedBackground: string
  focusedColor: string
  fontSize: string
  height: string
  width: string
  paddingBottom: string
  fontFamily: string
}

export default class StyledInputPassword extends InputPassword {
  private _options = {
    color: colors.white.primary,
    background: colors.black.primary,
    focusedBackground: colors.black.primary,
    focusedColor: colors.white.primary,
    fontSize: '24px',
    height: '60px',
    width: '80%',
    paddingBottom: '20px',
    fontFamily: 'Goudy Bookletter',
  }
  constructor(name: string, options?: Partial<InputPasswordOptions>) {
    super(name)
    const styles = Object.entries(this._options) as Entries<InputPasswordOptions>
    styles.forEach(([key, value]) => {
      this[key] = options && options[key] || value
    })
  }
}
