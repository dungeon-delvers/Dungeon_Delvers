import { StackPanel, TextBlock } from '@babylonjs/gui';

import { Button } from './Buttons';
import { colors } from './colors';

type changeCallbacks = {
  upChange: () => void;
  upDisabled?: (value: number) => boolean;
  downChange: () => void;
  downDisabled?: (value: number) => boolean;
};

export class Rocker extends StackPanel {
  #input_down: Button;
  #input_up: Button;
  #input_value: TextBlock;
  #value: number;

  constructor(name: string, label: string, value: number, changeCallbacks?: changeCallbacks) {
    super(name);
    this.isVertical = false;
    this.#value = value;
    this.width = '100%';
    this.height = '60px';
    this.isVertical = false;
    const labelBlock = new TextBlock(`${name}_label`, label);
    labelBlock.horizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
    labelBlock.verticalAlignment = TextBlock.VERTICAL_ALIGNMENT_CENTER;
    this.addControl(labelBlock);
    labelBlock.width = '150px';
    labelBlock.height = '60px';
    labelBlock.paddingBottom = '20px';
    labelBlock.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_CENTER;
    labelBlock.color = colors.gold.primary;
    const inputStack = new StackPanel(`${name}_input_stack`);
    inputStack.isVertical = false;
    this.#input_down = new Button(`${name}_down`, '◀');
    this.#input_down.width = '60px';
    this.#input_up = new Button(`${name}_up`, '▶');
    this.#input_up.width = '60px';
    this.#input_value = new TextBlock(`${name}_value`, this.#value.toString());
    this.#input_value.color = colors.gold.primary;
    this.#input_value.width = '60px';
    this.#input_value.height = '60px';
    this.#input_value.paddingBottom = '20px';
    this.#input_value.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_CENTER;
    this.#input_down.onPointerClickObservable.add(() => {
      this.#value--;
      this.#input_value.text = this.#value.toString();
      if (changeCallbacks) {
        changeCallbacks.downChange();
        if (changeCallbacks.downDisabled) {
          this.#input_down.isEnabled = changeCallbacks.downDisabled(this.#value);
        }
      }
    });
    this.#input_up.onPointerClickObservable.add(() => {
      this.#value++;
      this.#input_value.text = this.#value.toString();
      if (changeCallbacks) {
        changeCallbacks.upChange();
      }
      if (changeCallbacks?.upDisabled) {
        this.#input_up.isEnabled = changeCallbacks.upDisabled(this.#value);
      }
    });
    inputStack.addControl(this.#input_down);
    inputStack.addControl(this.#input_value);
    inputStack.addControl(this.#input_up);
    inputStack.height = '60px';
    inputStack.horizontalAlignment = StackPanel.HORIZONTAL_ALIGNMENT_RIGHT;
    inputStack.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_CENTER;
    inputStack.background = colors.gray[1];
    this.addControl(inputStack);
  }

  set value(number) {
    this.#value = number;
    this.#input_value.text = this.#value.toString();
  }

  get value() {
    return this.#value;
  }

  disableUp(isDisabled: boolean) {
    this.#input_up.isEnabled = !isDisabled;
  }

  disableDown(isDisabled: boolean) {
    this.#input_down.isEnabled = !isDisabled;
  }
}
