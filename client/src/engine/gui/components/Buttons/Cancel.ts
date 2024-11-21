import { colors } from '../colors';
import Button from './Button';

export default class CancelButton extends Button {
  constructor(name: string, text: string) {
    super(name, text, {
      background: colors.red.primary,
      disabledColor: colors.red.disabled,
      color: colors.white.primary,
    });
    this.onFocusObservable.add(() => {
      this.background = colors.red[5];
      this.color = colors.black.primary;
    });
    this.onBlurObservable.add(() => {
      this.background = colors.red.primary;
      this.color = colors.white.primary;
    });
  }
}
