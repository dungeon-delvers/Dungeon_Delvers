import { TextBlock } from '@babylonjs/gui'

export default class Title extends TextBlock {
  constructor(id: string, text: string) {
    super(id, text)
    this.color = '#ffffff'
    this.fontFamily = 'Goudy Bookletter'
    this.text = text
    this.fontSize = '40px'
    this.height = '110px'
    this.width = '500px'
    this.paddingTop = '40px'
    this.paddingBottom = '20px'
  }
}
