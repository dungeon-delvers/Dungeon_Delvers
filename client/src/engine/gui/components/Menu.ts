import { Button, Control, InputPassword, InputText, Rectangle, StackPanel, TextBlock } from '@babylonjs/gui';
import { colors } from './colors';
import { Cancel } from './Buttons';
import { StringTools } from '@babylonjs/inspector/stringTools';

export default class Menu extends StackPanel {
  private _error: StackPanel | null = null;
  private _formElements: Record<string, Control> = {};
  private _menuId: StringTools;
  private _tabIndexes: string[] = [];
  private _tabIndex: number = 1;
  _goToCharacterSelect: () => void;
  constructor(
    menu_id: string,
    options: {
      width: string;
      height: string;
    },
  ) {
    super(menu_id);
    this._menuId = menu_id;
    this.width = options.width;
    this.height = options.height;
    this.isVertical = true;
    this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    this.createBackground(this);
  }

  get formElements() {
    return this._formElements;
  }

  set formElements(elements: Record<string, Control>) {
    this._formElements = elements;
    this.addFormElements();
  }

  private addFormElements() {
    let tabIndex = 1;
    Object.entries(this._formElements).map(([key, element]) => {
      if (element instanceof Button || element instanceof InputText || element instanceof InputPassword) {
        element.tabIndex = this._tabIndex;
        this._tabIndexes[tabIndex] = key;
        tabIndex++;
      }
      this.addControl(element);
    });
  }

  renderError(error: Error) {
    this._error = new StackPanel(`${this._menuId}_error_panel`);
    this._error.width = '500px';
    this._error.isVertical = true;
    this.createBackground(this._error);
    const message = new TextBlock(`${this._menuId}_error_message`, error.message);
    message.color = colors.white.primary;
    message.fontSize = '18px';
    message.textWrapping = true;
    message.width = '100%';
    message.paddingLeft = '20px';
    message.paddingRight = '20px';
    message.height = '100px';
    const close = new Cancel(`${this._menuId}_error_close`, 'Close');
    close.onPointerUpObservable.add(() => {
      this.closeError();
    });
    close.width = '100px';
    this._error.addControl(message);
    this._error.addControl(close);
    this.parent?.addControl(this._error);
  }

  private closeError() {
    if (this._error) {
      this._error.dispose();
    }
  }

  private createBackground(panel: StackPanel) {
    const background = new Rectangle(`${this._menuId}_background`);
    background.background = colors.gray.background;
    background.width = '100%';
    background.color = colors.gold.primary;
    panel.addControl(background);
  }
}
