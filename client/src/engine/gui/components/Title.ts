import { TextBlock } from '@babylonjs/gui'

type TitleOptions = {
  color: string
  fontFamily: string
  fontSize: string
  height: string
  width: string
  paddingTop: string
  paddingBottom: string
}


export default class Title extends TextBlock {
  private _options: TitleOptions = {
    color: '#ffffff',
    fontFamily: 'Goudy Bookletter',
    fontSize: '40px',
    height: '110px',
    width: '80%',
    paddingTop: '40px',
    paddingBottom: '20px',
  }
  constructor(id: string, text: string, options?: Partial<TitleOptions>) {
    super(id, text)
    const styles = Object.entries(this._options) as Entries<TitleOptions>
    styles.forEach(([key, value]) => {
      this[key] = options && options[key] || value
    })
  }
}
