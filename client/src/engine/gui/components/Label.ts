import { TextBlock } from "@babylonjs/gui";

export default class Label extends TextBlock {
  constructor(id: string, text: string) {
    super(id, text)
    this.color = '#ffffff'
    this.fontFamily = 'Goudy Bookletter'
    this.text = text
    this.height = '40px'
    this.width = '500px'
    this.paddingRight = '20px'
  }
}