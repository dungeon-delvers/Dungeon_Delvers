import { InputText } from '@babylonjs/gui';
import Label from './Label';

export default class LabeledInput {
  label: Label;
  input: InputText;
  constructor(id: string, label: string) {
    this.label = new Label(`${id}__label`, label);
    this.input = new InputText(`${id}__input`);
  }
  get value() {
    return this.input.text;
  }
  set value(value: string) {
    this.input.text = value;
  }
}
