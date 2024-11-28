import { Button, TextBlock } from '@babylonjs/gui';
import { colors } from '../colors';

type ButtonOptions = {
  background: string;
  color: string;
  disabledColor: string;
  disabledColorItem: string;
  fontFamily: string;
  fontSize: string;
  height: string;
  paddingBottom: string;
  width: string;
};
export default class StyledButton extends Button {
  private _text: TextBlock;
  private _onClick: () => void;
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
  };
  constructor(name: string, text: string, options?: Partial<ButtonOptions>) {
    super(name);
    this._options = { ...this._options, ...options };
    const textBlock = new TextBlock(`${name}_text_block`, text);
    this.addControl(textBlock);
    const styles = Object.entries(this._options) as Entries<ButtonOptions>;
    styles.forEach(([key, value]) => {
      this[key] = (options && options[key]) || value;
    });
    this.onFocusObservable.add(() => {
      this.background = colors.gray[5];
      this.color = colors.black.primary;
    });
    this.onBlurObservable.add(() => {
      this.background = colors.gray[2];
      this.color = colors.white.primary;
    });
  }
  set onClick(callback: () => void) {
    this._onClick = callback;
    this.onPointerClickObservable.add(() => {
      this._onClick();
    });
    this.onKeyboardEventProcessedObservable.add(event => {
      if (event.key === 'Enter' || (event.key === ' ' && this._isFocused)) {
        this._onClick();
      }
    });
  }
}
