import { FollowCamera, Scene, SceneLoader, Vector3 } from '@babylonjs/core';

import CharacterCreateScene from '../../../public/assets/models/character_create_scene.glb';
import { RaceName } from '../core/races';
import { CharacterModels, CharacterProps } from '../graphics/race/race';
import { Accept, Button, Cancel } from '../gui/components/Buttons';
import Menu from '../gui/components/Menu';
import Title from '../gui/components/Title';
import { IPlayerCharacter } from '../../interfaces/IPlayerCharacter';

const menu_id = 'character_select_menu';

export const fetchPlayerCharacters = async () => {
  const ddAuth = localStorage.getItem('dd_auth');
  const { token } = ddAuth && JSON.parse(ddAuth);
  const response = await fetch(
    `${process.env.AUTH_URL}${process.env.AUTH_PORT ? `:${process.env.AUTH_PORT}` : ''}/api/characters`,
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

type CharacterCreationSettings = CharacterProps & {
  cameraRadius: number;
  cameraHeightOffset: number;
};

type CharactersCreationSettings = {
  DWARF: CharacterCreationSettings;
  GOBLIN: CharacterCreationSettings;
  HUMAN: CharacterCreationSettings;
  ORC: CharacterCreationSettings;
};

export default class CharacterSelect extends Menu {
  private _camera: FollowCamera;
  private _characterSettings: CharactersCreationSettings;
  private _clickHandlers: Record<CHARACTER_ELEMENTS, null | (() => void)> = {
    [CHARACTER_ELEMENTS.CHARACTER_1]: null,
    [CHARACTER_ELEMENTS.CHARACTER_2]: null,
    [CHARACTER_ELEMENTS.CHARACTER_3]: null,
    [CHARACTER_ELEMENTS.CHARACTER_4]: null,
    [CHARACTER_ELEMENTS.CHARACTER_5]: null,
    [CHARACTER_ELEMENTS.CHARACTER_6]: null,
  };
  private _characters: IPlayerCharacter[];
  private _scene: Scene;
  private _selectedRace: RaceName | null = null;
  private _selectedGender: 'MALE' | 'FEMALE' | null = null;

  constructor(scene: Scene, _goToLogin: () => void, characters: IPlayerCharacter[]) {
    super(menu_id, {
      width: '20% ',
      height: '100%',
    });
    this._characters = characters;
    this._scene = scene;
    this.horizontalAlignment = Menu.HORIZONTAL_ALIGNMENT_LEFT;
    this.formElements = {
      [TITLE]: new Title(TITLE, 'Select Your Character', {
        fontSize: '4%',
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
    Object.entries(this._clickHandlers).forEach(([key, element]) => {
      this.formElements[key].onPointerUpObservable.add(element);
    });
    this._renderCharacterCreationScene();
    this.formElements[LOGOUT].onPointerUpObservable.add(async () => {
      await this._logout();
      _goToLogin();
    });
  }

  private _renderCharacterSlot(key: CHARACTER_ELEMENTS, index: number) {
    const characterExists = index in this._characters;
    this._clickHandlers[key] = () => {
      if (characterExists) {
        this._selectedRace = this._characters[index].race;
        this._selectedGender = this._characters[index].gender;
        this._setModelVisibility();
        this.formElements[LOGIN].isEnabled = true;
      } else {
        console.log('create character');
      }
    };

    return characterExists ? this._characters[index].name : 'Create Character';
  }

  private async _renderCharacterCreationScene() {
    this._scene.cameras.forEach(camera => {
      camera.dispose();
    });
    this._camera = new FollowCamera(`${menu_id}_camera`, new Vector3(0, 5, -5), this._scene);
    const characterSelectScene = await SceneLoader.ImportMeshAsync(null, '', CharacterCreateScene, this._scene);
    characterSelectScene.lights.forEach(light => {
      light.intensity = 20;
    });
    const result = await CharacterModels.loadCharacterMeshes(this._scene);
    this._characterSettings = Object.entries(result.characters).reduce((accumulator, [key, value]) => {
      const characterSelectData = value as CharacterCreationSettings;
      if (['dwarf', 'goblin'].some(race => key.includes(race))) {
        characterSelectData.cameraRadius = 3;
        characterSelectData.cameraHeightOffset = 1;
      }
      if (['human', 'orc'].some(race => key.includes(race))) {
        characterSelectData.cameraRadius = 6;
        characterSelectData.cameraHeightOffset = 1.5;
      }
      accumulator[key as keyof CharactersCreationSettings] = characterSelectData;
      return accumulator;
    }, {} as CharactersCreationSettings);
    result.root.position = new Vector3(0, 0.85, 0);
    // this._selectedGender = 'm';
    // this._selectedRace = 'human';
    // this._setModelVisibility();
    this._hideAllCharacters();
    this._camera.radius = 6;
    this._camera.heightOffset = 2;
    this._camera.fov = 1;
    this._camera.lockedTarget = result.root;
    this._camera.upperRadiusLimit = 6;
    this._camera.lowerRadiusLimit = 3;
    this._camera.upperHeightOffsetLimit = 2;
    this._camera.lowerHeightOffsetLimit = 1;
    this._camera.maxCameraSpeed = 1;
  }

  private _hideAllCharacters() {
    let character: keyof typeof this._characterSettings;
    for (character in this._characterSettings) {
      this._characterSettings[character].mesh.isVisible = false;
      this._characterSettings[character].animations.idle.stop();
    }
  }

  private _setModelVisibility() {
    let character: keyof typeof this._characterSettings;
    for (character in this._characterSettings) {
      if (
        this._selectedGender &&
        this._selectedRace &&
        character !== `${this._selectedGender[0].toLowerCase()}_${this._selectedRace.toLowerCase()}`
      ) {
        this._characterSettings[character].mesh.isVisible = false;
        this._characterSettings[character].animations.idle.stop();
      } else {
        this._characterSettings[character].mesh.isVisible = true;
        this._characterSettings[character].animations.idle.play(true);
        this._camera.radius = this._characterSettings[character].cameraRadius;
        this._camera.heightOffset = this._characterSettings[character].cameraHeightOffset;
      }
    }
  }

  private async _logout() {
    const ddAuthString = localStorage.getItem('dd_auth');
    const user = ddAuthString && JSON.parse(ddAuthString);
    await fetch(`${process.env.AUTH_URL}${process.env.AUTH_PORT ? `:${process.env.AUTH_PORT}` : ''}/api/logout`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
      }),
    });
    localStorage.removeItem('dd_auth');
  }
}
