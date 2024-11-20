import { Button, TextBlock } from '@babylonjs/gui'
import { colors } from '../colors'

type ButtonOptions = {
  background: string
  color: string
  disabledColor: string
  disabledColorItem: string
  fontFamily: string
  fontSize: string
  height: string
  paddingBottom: string
  width: string
}
export default class StyledButton extends Button {
  private _text: TextBlock
  private _options: ButtonOptions = {
    background: colors.gray[2],
    color: colors.white.primary,
    disabledColor: colors.gray[5],
    disabledColorItem: colors.gray[7],
    fontFamily: 'Goudy Bookletter',
    fontSize: '24px',
    height: '60px',
    paddingBottom: '20px',
    width: '80%',
  }
  constructor(name: string, text: string, options?: Partial<ButtonOptions>) {
    super(name)
    this._options = { ...this._options, ...options }
    const textBlock = new TextBlock(`${name}_text_block`, text)
    this.addControl(textBlock)
    const styles = Object.entries(this._options) as Entries<ButtonOptions>
    styles.forEach(([key, value]) => {
      this[key] = options && options[key] || value
    })
  }
}
