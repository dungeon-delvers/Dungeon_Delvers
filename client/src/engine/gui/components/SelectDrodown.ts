import { StackPanel } from '@babylonjs/gui';

import { Button } from './Buttons';

type Option = {
  value: string;
  label: string;
};

export default class SelectDropdown extends StackPanel {
  private _open: boolean = false;
  private _options: Option[];
  private _currentValue: string;
  private _stack: StackPanel;
  constructor(name: string, options: Option[], currentValue?: string) {
    super(name);
    this._currentValue = currentValue || options[0].value;
    this._options = options;
    const button = new Button(`${name}_button`, `${this._currentValue} ▼`);
    button.onPointerClickObservable.add(() => {
      this._open = !this._open;
      button.text = `${this._currentValue} ${this._open ? '▲' : '▼'}`;
      if (this._open) {
        this.addControl(this._stack);
      } else {
        this.removeControl(this._stack);
      }
    });
    this._stack = new StackPanel(`${name}_stack`);
    this._options.forEach(option => {
      const optionButton = new Button(`${name}_${option.label}`, option.value);
      optionButton.onPointerClickObservable.add(() => {
        this._currentValue = option.value;
        button.text = `${this._currentValue} ▼`;
        this._open = false;
        this.removeControl(this._stack);
      });
      this._stack.addControl(optionButton);
    });
    this.addControl(button);
  }
}
