import { Race } from '@dungeon-delvers/types';
import { PlayerCharacter } from '@dungeon-delvers/types';

import { CharacterModelsProps } from '../graphics/race/race';
import { CharacterScene } from '../graphics/scenes/characterScene';
import { Accept, Button, Cancel } from '../gui/components/Buttons';
import StyledStack from '../gui/components/StyledStack';
import Title from '../gui/components/Title';

const menu_id = 'character_select_menu';

export const fetchPlayerCharacters = async () => {
  const ddAuth = localStorage.getItem('dd_auth');
  const { token } = ddAuth && JSON.parse(ddAuth);
  const response = await fetch(
    `${process.env.SERVER_AUTH_URL}${process.env.SERVER_AUTH_PORT ? `:${process.env.SERVER_AUTH_PORT}` : ''}/api/characters`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const { characters } = await response.json();
  return characters;
};

enum CHARACTER_ELEMENTS {
  CHARACTER_1 = `${menu_id}_character_1`,
  CHARACTER_2 = `${menu_id}_character_2`,
  CHARACTER_3 = `${menu_id}_character_3`,
  CHARACTER_4 = `${menu_id}_character_4`,
  CHARACTER_5 = `${menu_id}_character_5`,
  CHARACTER_6 = `${menu_id}_character_6`,
}

const TITLE = `${menu_id}_title`;
const LOGOUT = `${menu_id}_logout_button`;
const LOGIN = `${menu_id}_login_button`;

export default class CharacterSelect extends StyledStack {
  #clickHandlers: Record<CHARACTER_ELEMENTS, null | (() => void)> = {
    [CHARACTER_ELEMENTS.CHARACTER_1]: null,
    [CHARACTER_ELEMENTS.CHARACTER_2]: null,
    [CHARACTER_ELEMENTS.CHARACTER_3]: null,
    [CHARACTER_ELEMENTS.CHARACTER_4]: null,
    [CHARACTER_ELEMENTS.CHARACTER_5]: null,
    [CHARACTER_ELEMENTS.CHARACTER_6]: null,
  };
  #characters: PlayerCharacter[];
  #scene: CharacterScene;
  #selectedRace: Race | null = null;
  #selectedGender: 'MALE' | 'FEMALE' | null = null;
  #goToCharacterCreate: () => void;

  constructor(
    scene: CharacterScene,
    _goToLogin: () => void,
    _goToCharacterCreate: () => void,
    characters: PlayerCharacter[],
  ) {
    super(menu_id, {
      width: '20% ',
      height: '100%',
    });
    this.#characters = characters;
    this.#scene = scene;
    this.#goToCharacterCreate = _goToCharacterCreate;
    this.horizontalAlignment = StyledStack.HORIZONTAL_ALIGNMENT_LEFT;
    this.formElements = {
      [TITLE]: new Title(TITLE, 'Select Your Character', {
        fontSize: '3%',
      }),
      [CHARACTER_ELEMENTS.CHARACTER_1]: new Button(
        `${menu_id}_character_1`,
        this._renderCharacterSlot(CHARACTER_ELEMENTS.CHARACTER_1, 0),
      ),
      [CHARACTER_ELEMENTS.CHARACTER_2]: new Button(
        `${menu_id}_character_2`,
        this._renderCharacterSlot(CHARACTER_ELEMENTS.CHARACTER_2, 1),
      ),
      [CHARACTER_ELEMENTS.CHARACTER_3]: new Button(
        `${menu_id}_character_3`,
        this._renderCharacterSlot(CHARACTER_ELEMENTS.CHARACTER_3, 2),
      ),
      [CHARACTER_ELEMENTS.CHARACTER_4]: new Button(
        `${menu_id}_character_4`,
        this._renderCharacterSlot(CHARACTER_ELEMENTS.CHARACTER_4, 3),
      ),
      [CHARACTER_ELEMENTS.CHARACTER_5]: new Button(
        `${menu_id}_character_5`,
        this._renderCharacterSlot(CHARACTER_ELEMENTS.CHARACTER_5, 4),
      ),
      [CHARACTER_ELEMENTS.CHARACTER_6]: new Button(
        `${menu_id}_character_6`,
        this._renderCharacterSlot(CHARACTER_ELEMENTS.CHARACTER_6, 5),
      ),
      [LOGOUT]: new Cancel(`${menu_id}_logout`, 'Logout'),
      [LOGIN]: new Accept(`${menu_id}_logout`, 'Enter World'),
    };
    this.formElements[LOGIN].isEnabled = false;
    this.formElements[CHARACTER_ELEMENTS.CHARACTER_1].height = '80px';
    this.formElements[CHARACTER_ELEMENTS.CHARACTER_1].paddingTop = '20px';
    Object.entries(this.#clickHandlers).forEach(([key, element]) => {
      this.formElements[key].onPointerUpObservable.add(element);
    });
    this.formElements[LOGOUT].onPointerUpObservable.add(async () => {
      await this._logout();
      _goToLogin();
    });
  }

  private _renderCharacterSlot(key: CHARACTER_ELEMENTS, index: number) {
    const characterExists = index in this.#characters;
    this.#clickHandlers[key] = () => {
      if (characterExists) {
        this.#selectedRace = this.#characters[index].race;
        this.#selectedGender = this.#characters[index].gender;
        this.#scene.selectedCharacter =
          `${this.#selectedGender[0].toLocaleLowerCase()}_${this.#selectedRace.toLowerCase()}` as keyof CharacterModelsProps;
        this.formElements[LOGIN].isEnabled = true;
      } else {
        this.#goToCharacterCreate();
      }
    };

    return characterExists ? this.#characters[index].name : 'Create Character';
  }

  private async _logout() {
    const ddAuthString = localStorage.getItem('dd_auth');
    const user = ddAuthString && JSON.parse(ddAuthString);
    await fetch(
      `${process.env.SERVER_AUTH_URL}${process.env.SERVER_AUTH_PORT ? `:${process.env.SERVER_AUTH_PORT}` : ''}/api/logout`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
        }),
      },
    );
    localStorage.removeItem('dd_auth');
  }
}
