import { Grid, Rectangle, StackPanel, TextBlock } from '@babylonjs/gui';
import {
  Attribute,
  PLAYER_CLASS,
  PlayerClass,
  RACE,
  Race,
  RaceData,
} from 'types/game';

// import { CharacterModelsProps } from '../graphics/race/race';
// import { Zone } from '../graphics/zone';
import { Accept, Cancel } from '../gui/components/Buttons';
import Button from '../gui/components/Buttons/Button';
import StyledInputText from '../gui/components/InputText';
import Label from '../gui/components/Label';
import { Rocker } from '../gui/components/Rocker';
import SelectDropdown from '../gui/components/SelectDrodown';
import { colors } from '../gui/components/colors';

const menu_id = 'character_create_menu';

export const fetchRaces = async () => {
  const ddAuth = localStorage.getItem('dd_auth');
  const { token } = ddAuth && JSON.parse(ddAuth);
  const response = await fetch(
    `${process.env.SERVER_AUTH_URL}${process.env.SERVER_AUTH_PORT ? `:${process.env.SERVER_AUTH_PORT}` : ''}/api/races`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { races } = await response.json();
  return races;
};

export default class CharacterCreate extends Grid {
  #attributes: Record<Attribute, Rocker>;
  #availablePoints: number = 15;
  #availablePointsLabel: TextBlock;
  #createButton: Accept;
  #leftStack: StackPanel;
  #nameInput: StyledInputText;
  #raceData: RaceData[];
  #raceDescription: TextBlock;
  #rightStack: StackPanel;
  // #zone: Zone;
  #selectedClass: PlayerClass = 'FIGHTER';
  #selectedGender: 'm' | 'f' = 'm';
  #selectedRace: Race = 'HUMAN';

  constructor(raceData, goToCharacterSelect: () => void) {
    super(menu_id);
    // this.#zone = zone;
    this.#raceData = raceData;
    console.log(this.#raceDescription);
    this.#raceDescription = new TextBlock(
      `${menu_id}_racial_description`,
      this.#raceData.find(
        (element) => element.race === this.#selectedRace
      )?.description
    );
    const changeCallbacks = {
      upChange: () => {
        if (this.#availablePoints > 0) {
          this.#availablePoints--;
          this.#availablePointsLabel.text = `Available Points: ${this.#availablePoints}`;
          this.isCreateEnabled();
        }
      },
      upDisabled: (value) => !(this.#availablePoints === 0 || value === 20),
      downChange: () => {
        if (this.#availablePoints < 15) {
          this.#availablePoints++;
          this.#availablePointsLabel.text = `Available Points: ${this.#availablePoints}`;
        }
      },
      downDisabled: (value) => !(this.#availablePoints === 15 || value === 5),
    };
    this.#attributes = {
      CON: new Rocker(`${menu_id}_con`, 'CONSTITUTION', 10, changeCallbacks),
      DEX: new Rocker(`${menu_id}_dex`, 'DEXTERITY', 10, changeCallbacks),
      INT: new Rocker(`${menu_id}_int`, 'INTELLIGENCE', 10, changeCallbacks),
      MIG: new Rocker(`${menu_id}_mig`, 'MIGHT', 10, changeCallbacks),
      PER: new Rocker(`${menu_id}_per`, 'PERCEPTION', 10, changeCallbacks),
      RES: new Rocker(`${menu_id}_res`, 'RESOLVE', 10, changeCallbacks),
    };
    this.#raceDescription.color = colors.gray[9];
    this.#raceDescription.width = '90%';
    this.#raceDescription.textWrapping = true;
    this.#raceDescription.paddingBottom = '10px';
    this.#raceDescription.height = '300px';
    this.addColumnDefinition(0.2);
    this.addColumnDefinition(0.6);
    this.addColumnDefinition(0.2);
    this.addBackground(0);
    this.addBackground(2);
    this.#leftStack = new StackPanel(`${menu_id}_left`);
    this.#leftStack.width = '100%';
    this.#leftStack.height = '100%';
    this.addControl(this.#leftStack, 1, 0);
    this.#rightStack = new StackPanel(`${menu_id}_right`);
    this.#rightStack.width = '100%';
    this.#rightStack.height = '100%';
    this.addControl(this.#rightStack, 0, 2);
    const nameLabel = new Label(`${menu_id}_name_label`, 'Character Name');
    nameLabel.color = colors.gold.primary;
    nameLabel.height = '60px';
    nameLabel.width = '100%';
    nameLabel.fontSize = '3%';
    this.#nameInput = new StyledInputText(`${menu_id}_name_input`);
    this.#nameInput.onKeyboardEventProcessedObservable.add(() => {
      this.isCreateEnabled();
    });
    this.#leftStack.addControl(nameLabel);
    this.#leftStack.addControl(this.#nameInput);
    this.addLine(this.#leftStack);
    const raceLabel = new Label(`${menu_id}_race_label`, 'Race');
    raceLabel.color = colors.gold.primary;
    raceLabel.fontSize = '25px';
    raceLabel.paddingTop = '10px';
    raceLabel.paddingBottom = '10px';
    this.#leftStack.addControl(raceLabel);
    const raceSelectDropdown = new SelectDropdown(
      `${menu_id}_race_dropdown`,
      Object.entries(RACE).map(([key, value]) => {
        return {
          label: key.toLowerCase(),
          value,
        };
      }),
      this.#selectedRace,
      (value) => {
        this.#selectedRace = value as Race;
        const description =
          this.#raceData.find((element) => element.race === this.#selectedRace)
            ?.description || '';
        this.#raceDescription.text = description;
        this.renderAttributes();
        // this.updateCharacter();
      }
    );
    this.#leftStack.addControl(raceSelectDropdown);
    this.addLine(this.#leftStack);
    const playerClassLabel = new Label(
      `${menu_id}_player_class_label`,
      'Class'
    );
    playerClassLabel.color = colors.gold.primary;
    playerClassLabel.fontSize = '25px';
    playerClassLabel.paddingTop = '10px';
    playerClassLabel.paddingBottom = '10px';
    this.#leftStack.addControl(playerClassLabel);
    const playerClassSelectDropdown = new SelectDropdown(
      `${menu_id}_race_dropdown`,
      Object.entries(PLAYER_CLASS).map(([key, value]) => {
        return {
          label: key.toLowerCase(),
          value,
        };
      }),
      this.#selectedClass,
      (value) => (this.#selectedClass = value as PlayerClass)
    );
    this.#leftStack.addControl(playerClassSelectDropdown);
    this.addLine(this.#leftStack);
    const genderLabel = new Label(`${menu_id}_gender_label`, 'Gender');
    genderLabel.color = colors.gold.primary;
    genderLabel.fontSize = '25px';
    genderLabel.paddingTop = '10px';
    genderLabel.paddingBottom = '10px';
    this.#leftStack.addControl(genderLabel);
    const genderStack = new StackPanel(`${menu_id}_gender_stack`);
    const maleButton = new Button(`${menu_id}_male_button`, '♂');
    const femaleButton = new Button(`${menu_id}_female_button`, '♀');
    maleButton.onPointerClickObservable.add(() => {
      this.#selectedGender = 'm';
      // this.updateCharacter();
    });
    femaleButton.onPointerClickObservable.add(() => {
      this.#selectedGender = 'f';
      // this.updateCharacter();
    });
    maleButton.width = '40px';
    femaleButton.width = '40px';
    genderStack.isVertical = false;
    genderStack.spacing = 20;
    genderStack.adaptWidthToChildren = true;
    genderStack.height = '60px';
    genderStack.addControl(maleButton);
    genderStack.addControl(femaleButton);
    this.#leftStack.addControl(genderStack);
    this.#leftStack.addControl(this.#raceDescription);
    const AttributeLabel = new Label(
      `${menu_id}_attributes_label`,
      'Attributes'
    );
    AttributeLabel.color = colors.gold.primary;
    AttributeLabel.height = '80px';
    AttributeLabel.fontSize = '25px';
    AttributeLabel.paddingBottom = '20px';
    this.#rightStack.addControl(AttributeLabel);
    this.#availablePointsLabel = new Label(
      `${menu_id}_available_points_label`,
      `Available Points: ${this.#availablePoints}`
    );
    this.#availablePointsLabel.color = colors.gold.primary;
    this.#availablePointsLabel.height = '60px';
    this.#availablePointsLabel.fontSize = '20px';
    this.#availablePointsLabel.paddingBottom = '20px';
    this.#rightStack.addControl(this.#availablePointsLabel);
    this.renderAttributes();
    Object.values(this.#attributes).forEach((attribute) => {
      this.#rightStack.addControl(attribute);
    });
    const navStack = new StackPanel(`${menu_id}_nav_stack`);
    navStack.isVertical = false;
    navStack.height = '60px';
    navStack.spacing = 20;
    navStack.adaptWidthToChildren = true;
    const backButton = new Cancel(`${menu_id}_back_button`, 'Back');
    backButton.width = '100px';
    backButton.onPointerClickObservable.add(goToCharacterSelect);
    this.#createButton = new Accept(`${menu_id}_create_button`, 'Create');
    this.#createButton.width = '100px';
    this.isCreateEnabled();
    this.#createButton.onPointerClickObservable.add(this.createCharacter);
    navStack.addControl(backButton);
    navStack.addControl(this.#createButton);
    navStack.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_BOTTOM;
    this.addControl(navStack, 0, 1);
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
  // updateCharacter() {
  //   this.#zone.scene.selectedCharacter =
  //     `${this.#selectedGender}_${this.#selectedRace.toLowerCase()}` as keyof CharacterModelsProps;
  // }

  renderAttributes() {
    const attributes = this.#raceData.find(
      (element) => element.race === this.#selectedRace
    ) as RaceData;
    for (const key in this.#attributes) {
      if (Object.prototype.hasOwnProperty.call(this.#attributes, key)) {
        const attribute = this.#attributes[key];
        attribute.value = attributes[key];
      }
    }
  }

  isCreateEnabled() {
    this.#createButton.isEnabled =
      this.#availablePoints === 0 && this.#nameInput.text.length >= 5;
  }

  createCharacter = async () => {
    const ddAuth = localStorage.getItem('dd_auth');
    const { token } = ddAuth && JSON.parse(ddAuth);
    const character = {
      name: this.#nameInput.text,
      race: this.#selectedRace,
      class: this.#selectedClass,
      gender: this.#selectedGender === 'm' ? 'MALE' : 'FEMALE',
      CON: this.#attributes.CON.value,
      DEX: this.#attributes.DEX.value,
      INT: this.#attributes.INT.value,
      MIG: this.#attributes.MIG.value,
      PER: this.#attributes.PER.value,
      RES: this.#attributes.RES.value,
    };
    const response = await fetch(
      `${process.env.SERVER_AUTH_URL}${process.env.SERVER_AUTH_PORT ? `:${process.env.SERVER_AUTH_PORT}` : ''}/api/character/create`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(character),
      }
    );
    console.log(response);
  };
}
