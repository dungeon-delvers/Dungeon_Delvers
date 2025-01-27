import { colors } from '../colors';
import Button from './Button';

export default class CancelButton extends Button {
  constructor(name: string, text: string) {
    super(
      name,
      text,
      {
        background: colors.red.primary,
        disabledColor: colors.red.disabled,
        color: colors.white.primary,
      },
      colors.red[2],
    );
  }
}
