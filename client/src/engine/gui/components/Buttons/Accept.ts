import { colors } from '../colors'
import Button from './Button'

export default class AcceptButton extends Button {
  constructor(name: string, text: string) {
    super(name, text, {
      background: colors.green.primary,
      disabledColor: colors.green.disabled,
      color: colors.white.primary,
    })
  }
}
