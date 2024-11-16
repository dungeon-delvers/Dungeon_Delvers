import { InputText } from '@babylonjs/gui'

export default class StyledInputText extends InputText {
  constructor(name: string) {
    super(name)
    this.color = '#ffffff'
    this.fontSize = 24
    this.height = '60px'
    this.width = '500px'
    this.paddingBottom = '20px'
    this.fontFamily = 'Goudy Bookletter'
    this.onFocusObservable.add(() => {
      this.color = '#ffffff'
    })
  }
}
