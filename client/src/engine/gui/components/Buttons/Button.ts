import { Button, TextBlock } from '@babylonjs/gui'
import { colors } from '../colors'

type ButtonOptions = {
  background: string
  color: string
  disabledColor: string
  disabledColorItem: string
  fontSize: number
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
    fontSize: 24,
    height: '60px',
    paddingBottom: '20px',
    width: '500px',
  }
  constructor(name: string, text: string, options?: Partial<ButtonOptions>) {
    super(name)
    this._options = { ...this._options, ...options }
    const textBlock = new TextBlock(`${name}_text_block`, text)
    console.log(textBlock)
    this.addControl(textBlock)
    this.background = this._options.background
    this.color = this._options.color
    this.disabledColor = this._options.disabledColor
    this.fontFamily = 'Goudy Bookletter'
    this.fontSize = this._options.fontSize
    this.height = this._options.height
    this.paddingBottom = this._options.paddingBottom
    this.width = this._options.width
    this.onEnabledStateChangedObservable.add(() => {
      this.color = this.isEnabled
        ? this._options.color
        : this._options.disabledColorItem
    })
  }
}
