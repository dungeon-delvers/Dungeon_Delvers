import { Button, TextBlock } from '@babylonjs/gui'

export default class StyledButton extends Button {
  private _text: TextBlock
  constructor(name: string, text: string) {
    super(name)
    this._text = new TextBlock(`${name}_text_block`, text)
    this._text.color = this.isEnabled ? '#ffffff' : '#666666'
    this.color = '#ffffff'
    this.fontSize = 24
    this.height = '60px'
    this.width = '500px'
    this.paddingBottom = '20px'
    this.fontFamily = 'Goudy Bookletter'
    this.addControl(this._text)
    this.onEnabledStateChangedObservable.add(() => {
      this._text.color = this.isEnabled ? '#ffffff' : '#666666'
    })
  }
}
