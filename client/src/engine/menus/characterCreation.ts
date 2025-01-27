import { Grid, Rectangle, StackPanel } from '@babylonjs/gui';
import { PLAYER_CLASS, PlayerClass, RACE, Race } from '@dungeon-delvers/types';

import Button from '../gui/components/Buttons/Button';
import StyledInputText from '../gui/components/InputText';
import Label from '../gui/components/Label';
import SelectDropdown from '../gui/components/SelectDrodown';
import { colors } from '../gui/components/colors';

const menu_id = 'character_create_menu';

export default class CharacterCreate extends Grid {
  private _leftStack: StackPanel;
  private _rightStack: StackPanel;
  private _currentRace: Race = 'HUMAN';
  private _currentClass: PlayerClass = 'FIGHTER';
  constructor() {
    super(menu_id);
    this.addColumnDefinition(0.2);
    this.addColumnDefinition(0.6);
    this.addColumnDefinition(0.2);
    this.addBackground(0);
    this.addBackground(2);
    this._leftStack = new StackPanel(`${menu_id}_left`);
    this._leftStack.width = '100%';
    this._leftStack.height = '100%';
    this.addControl(this._leftStack, 1, 0);
    this._rightStack = new StackPanel(`${menu_id}_right`);
    this._rightStack.width = '100%';
    this._rightStack.height = '100%';
    this.addControl(this._rightStack, 0, 2);
    const nameLabel = new Label(`${menu_id}_name_label`, 'Character Name');
    nameLabel.color = colors.gold.primary;
    nameLabel.height = '60px';
    nameLabel.width = '100%';
    nameLabel.fontSize = '3%';
    const nameInput = new StyledInputText(`${menu_id}_name_input`);
    this._leftStack.addControl(nameLabel);
    this._leftStack.addControl(nameInput);
    this.addLine(this._leftStack);
    const raceLabel = new Label(`${menu_id}_race_label`, 'Race');
    raceLabel.color = colors.gold.primary;
    raceLabel.fontSize = '25px';
    raceLabel.paddingTop = '10px';
    raceLabel.paddingBottom = '10px';
    this._leftStack.addControl(raceLabel);
    const raceSelectDropdown = new SelectDropdown(
      `${menu_id}_race_dropdown`,
      Object.entries(RACE).map(([key, value]) => {
        return {
          label: key.toLowerCase(),
          value,
        };
      }),
      this._currentRace,
    );
    this._leftStack.addControl(raceSelectDropdown);
    this.addLine(this._leftStack);
    const playerClassLabel = new Label(`${menu_id}_player_class_label`, 'Class');
    playerClassLabel.color = colors.gold.primary;
    playerClassLabel.fontSize = '25px';
    playerClassLabel.paddingTop = '10px';
    playerClassLabel.paddingBottom = '10px';
    this._leftStack.addControl(playerClassLabel);
    const playerClassSelectDropdown = new SelectDropdown(
      `${menu_id}_race_dropdown`,
      Object.entries(PLAYER_CLASS).map(([key, value]) => {
        return {
          label: key.toLowerCase(),
          value,
        };
      }),
      this._currentClass,
    );
    this._leftStack.addControl(playerClassSelectDropdown);
    this.addLine(this._leftStack);
    const genderLabel = new Label(`${menu_id}_gender_label`, 'Gender');
    genderLabel.color = colors.gold.primary;
    genderLabel.fontSize = '25px';
    genderLabel.paddingTop = '10px';
    genderLabel.paddingBottom = '10px';
    this._leftStack.addControl(genderLabel);
    const genderStack = new StackPanel(`${menu_id}_gender_stack`);
    const maleButton = new Button(`${menu_id}_male_button`, '♂');
    const femaleButton = new Button(`${menu_id}_female_button`, '♀');
    maleButton.width = '40px';
    femaleButton.width = '40px';
    genderStack.isVertical = false;
    genderStack.spacing = 20;
    genderStack.adaptWidthToChildren = true;
    genderStack.height = '60px';
    genderStack.addControl(maleButton);
    genderStack.addControl(femaleButton);
    this._leftStack.addControl(genderStack);
  }

  addBackground(column) {
    const background = new Rectangle(`${menu_id}_background`);
    background.background = colors.gray.background;
    background.width = '100%';
    background.height = '100%';
    background.color = colors.gold.primary;
    this.addControl(background, 0, column);
  }

  addLine(stack) {
    const line = new Rectangle();
    line.width = '80%';
    line.height = '2px';
    line.color = colors.gold.primary;
    line.background = colors.gold.primary;
    stack.addControl(line);
  }
}
