import { Button, TextBlock } from '@babylonjs/gui';

import { colors } from '../colors';

type ButtonOptions = {
  background: string;
  color: string;
  cornerRadius: number;
  disabledColor: string;
  disabledColorItem: string;
  fontFamily: string;
  fontSize: string;
  height: string;
  paddingBottom: string;
  width: string;
};
export default class StyledButton extends Button {
  private _onClick: () => void;
  private _hoverColor: string = colors.gray[3];
  private _options: ButtonOptions = {
    background: colors.gray[2],
    color: colors.gold.primary,
    cornerRadius: 5,
    disabledColor: colors.gray[5],
    disabledColorItem: colors.gray[7],
    fontFamily: 'Goudy Bookletter',
    fontSize: '24px',
    height: '60px',
    paddingBottom: '20px',
    width: '80%',
  };
  constructor(name: string, text: string, options?: Partial<ButtonOptions>, hoverColor?: string) {
    super(name);
    this._options = { ...this._options, ...options };
    this._hoverColor = hoverColor || this._hoverColor;
    const textBlock = new TextBlock(`${name}_text_block`, text);
    textBlock.color = colors.white.primary;
    this.addControl(textBlock);
    const styles = Object.entries(this._options) as Entries<ButtonOptions>;
    styles.forEach(([key, value]) => {
      (this as unknown as string)[key] = value;
    });
    this.onFocusObservable.add(() => {
      this.pointerEnterObservable();
    });
    this.onBlurObservable.add(() => {
      this.pointerOutObservable();
    });
    this.onPointerEnterObservable.add(() => {
      this.pointerEnterObservable();
    });
    this.onPointerOutObservable.add(() => {
      this.pointerOutObservable();
    });
  }

  pointerOutObservable() {
    this.background = this._options.background;
  }

  pointerEnterObservable() {
    this.background = this._hoverColor;
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

  set text(text: string) {
    const textBlock = this.getChildByName(`${this.name}_text_block`);
    if (textBlock instanceof TextBlock) {
      textBlock.text = text;
    }
  }
  get text() {
    return (this.getChildByName(`${this.name}_text_block`) as TextBlock).text || '';
  }
}
