import { InputText } from '@babylonjs/gui';
import { colors } from './colors';

type InputTextOptions = {
  color: string;
  background: string;
  focusedBackground: string;
  focusedColor: string;
  fontSize: string;
  height: string;
  width: string;
  paddingBottom: string;
  fontFamily: string;
};

export default class StyledInputText extends InputText {
  private _options = {
    color: colors.white.primary,
    background: colors.gray.background,
    focusedBackground: colors.black.primary,
    focusedColor: colors.white.primary,
    fontSize: '24px',
    height: '60px',
    width: '80%',
    paddingBottom: '20px',
    fontFamily: 'Goudy Bookletter',
  };
  constructor(name: string, options?: Partial<InputTextOptions>) {
    super(name);
    const styles = Object.entries(this._options) as Entries<InputTextOptions>;
    styles.forEach(([key, value]) => {
      this[key] = (options && options[key]) || value;
    });
    this.onFocusObservable.add(() => {
      this.background = colors.gray.background;
      this.color = colors.white.primary;
    });
    this.isFocusInvisible = true;
    this.onFocusObservable.add(() => {
      console.log('focus');
    });
  }
}
