import { colors } from '../colors';
import Button from './Button';

export default class AcceptButton extends Button {
  constructor(name: string, text: string) {
    super(name, text, {
      background: colors.green.primary,
      disabledColor: colors.green.disabled,
      color: colors.white.primary,
    });
    this.onFocusObservable.add(() => {
      this.background = colors.green[5];
      this.color = colors.black.primary;
    });
    this.onBlurObservable.add(() => {
      this.background = colors.green.primary;
      this.color = colors.white.primary;
    });
  }
}
