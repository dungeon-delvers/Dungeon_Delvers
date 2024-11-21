import { Color3, FollowCamera, HemisphericLight, Scene, SceneLoader, Vector3 } from '@babylonjs/core';
import { Button, Cancel } from '../gui/components/Buttons';
import Menu from '../gui/components/Menu';
import Title from '../gui/components/Title';
import CharacterCreateScene from '../../../public/assets/models/character_create_scene.glb';
import { RaceName, Races } from '../core/races';
import { CharacterModels, CharacterProps } from '../graphics/race/race';

const menu_id = 'character_select_menu';

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

type CharacterCreationSettings = CharacterProps & {
  cameraRadius: number;
  cameraHeightOffset: number;
};

type CharactersCreationSettings = {
  f_dwarf: CharacterCreationSettings;
  f_goblin: CharacterCreationSettings;
  f_human: CharacterCreationSettings;
  f_orc: CharacterCreationSettings;
  m_dwarf: CharacterCreationSettings;
  m_goblin: CharacterCreationSettings;
  m_human: CharacterCreationSettings;
  m_orc: CharacterCreationSettings;
};

export default class CharacterSelect extends Menu {
  private _camera: FollowCamera;
  private _characters: CharactersCreationSettings;
  private _characterSelectFormElements = {
    [TITLE]: new Title(TITLE, 'Select Your Character', {
      fontSize: '25px',
    }),
    [CHARACTER_ELEMENTS.CHARACTER_1]: new Button(`${menu_id}_character_1`, 'Ricard'),
    [CHARACTER_ELEMENTS.CHARACTER_2]: new Button(`${menu_id}_character_2`, 'Grosh'),
    [CHARACTER_ELEMENTS.CHARACTER_3]: new Button(`${menu_id}_character_3`, 'Grik'),
    [CHARACTER_ELEMENTS.CHARACTER_4]: new Button(`${menu_id}_character_4`, 'Character 4'),
    [CHARACTER_ELEMENTS.CHARACTER_5]: new Button(`${menu_id}_character_5`, 'Character 5'),
    [CHARACTER_ELEMENTS.CHARACTER_6]: new Button(`${menu_id}_character_6`, 'Character 6'),
    [LOGOUT]: new Cancel(`${menu_id}_logout`, 'Logout'),
  };
  private _scene: Scene;
  private _selectedRace: RaceName;
  private _selectedGender: 'm' | 'f';
  private _races = new Races();

  constructor(scene: Scene, _goToLogin: () => void) {
    super(menu_id, {
      width: '15% ',
      height: '100%',
    });
    this._scene = scene;
    this.horizontalAlignment = Menu.HORIZONTAL_ALIGNMENT_LEFT;
    this.formElements = this._characterSelectFormElements;
    this.formElements[CHARACTER_ELEMENTS.CHARACTER_1].height = '80px';
    this.formElements[CHARACTER_ELEMENTS.CHARACTER_1].paddingTop = '20px';
    this._renderCharacterCreationScene();
    this.formElements[LOGOUT].onPointerUpObservable.add(() => {
      localStorage.removeItem('dd_auth');
      _goToLogin();
    });
    this._characterSelectFormElements[CHARACTER_ELEMENTS.CHARACTER_1].onPointerUpObservable.add(() => {
      this._setRace('human');
      this._setGender('m');
    });
    this._characterSelectFormElements[CHARACTER_ELEMENTS.CHARACTER_2].onPointerUpObservable.add(() => {
      this._setRace('orc');
      this._setGender('m');
    });
    this._characterSelectFormElements[CHARACTER_ELEMENTS.CHARACTER_3].onPointerUpObservable.add(() => {
      this._setRace('goblin');
      this._setGender('m');
    });
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
    this._characters = Object.entries(result.characters).reduce((accumulator, [key, value]) => {
      const characterSelectData = value as CharacterCreationSettings;
      switch (key) {
        case 'f_dwarf':
        case 'f_goblin':
        case 'm_dwarf':
        case 'm_goblin':
          characterSelectData.cameraRadius = 3;
          characterSelectData.cameraHeightOffset = 1;
          break;
        case 'f_human':
        case 'f_orc':
        case 'm_human':
        case 'm_orc':
          characterSelectData.cameraRadius = 6;
          characterSelectData.cameraHeightOffset = 1.5;
          break;
      }
      accumulator[key as keyof CharactersCreationSettings] = characterSelectData;
      return accumulator;
    }, {} as CharactersCreationSettings);
    result.root.position = new Vector3(0, 0.85, 0);
    this._selectedGender = 'm';
    this._selectedRace = 'human';
    this._setModelVisibility();
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

  private _setModelVisibility() {
    let character: keyof typeof this._characters;
    for (character in this._characters) {
      if (character !== `${this._selectedGender}_${this._selectedRace}`) {
        this._characters[character].mesh.isVisible = false;
        this._characters[character].animations.idle.stop();
      } else {
        this._characters[character].mesh.isVisible = true;
        this._characters[character].animations.idle.play(true);
        this._camera.radius = this._characters[character].cameraRadius;
        this._camera.heightOffset = this._characters[character].cameraHeightOffset;
      }
    }
  }

  private _setGender(gender: 'm' | 'f') {
    this._selectedGender = gender;
    this._setModelVisibility();
  }

  private _setRace(race: RaceName) {
    this._selectedRace = race;
    this._setModelVisibility();
  }
}
