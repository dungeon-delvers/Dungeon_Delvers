import {
  Color3,
  Engine,
  LoadSceneAsync,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
// import { AdvancedDynamicTexture, Control } from '@babylonjs/gui';
import '@babylonjs/inspector';
import { Socket, io } from 'socket.io-client';
import Zone from './core/zone';

// import '@babylonjs/loaders/glTF';
// import { Gender, Race } from 'types/game';

// import CharacterCreate, { fetchRaces } from './menus/characterCreation';
// import CharacterSelect, { fetchPlayerCharacters } from './menus/characterSelect';
// import Login from './menus/login';
// import Register from './menus/register';

// export enum GAME_STATE {
//   MAIN_MENU,
//   IN_GAME,
// }

// export enum MAIN_MENU_STATE {
//   LOGIN,
//   REGISTER,
//   CHARACTER_SELECT,
//   CHARACTER_CREATE,
// }

// export class Game {
//   #animationLoopCount = Math.floor(Math.random() * 10) + 1;
//   #assetsManager: AssetsManager;
//   #camera: FollowCamera;
//   #currentAnimation: AnimationGroup;
//   #currentLoop = 0;
//   #menu: AdvancedDynamicTexture;
//   #menuState: MAIN_MENU_STATE = MAIN_MENU_STATE.LOGIN;
//   #main_menu_states: Record<MAIN_MENU_STATE, () => Control | Promise<Control>>;

//   #scene: Scene;

//   constructor(engine: Engine) {
//     const scene = new Scene(engine);
//     this.#scene = scene;
//     this.#assetsManager = new AssetsManager(this.#scene);
//     this.#camera = new FollowCamera(`character_scene_camera`, new Vector3(0, 5, -5), this.#scene);
//     this.#camera.radius = 6;
//     this.#camera.heightOffset = 2;
//     this.#camera.fov = 1;
//     this.loadZone('rook_tower_02_14_2025');
//     this.loadCharacter('HUMAN', 'MALE');

//     this.#main_menu_states = {
//       [MAIN_MENU_STATE.LOGIN]: () =>
//         new Login(
//           () => this._changeMenu(MAIN_MENU_STATE.REGISTER),
//           () => this._changeMenu(MAIN_MENU_STATE.CHARACTER_SELECT),
//         ),
//       [MAIN_MENU_STATE.REGISTER]: () => new Register(() => this._changeMenu(MAIN_MENU_STATE.CHARACTER_SELECT)),
//       [MAIN_MENU_STATE.CHARACTER_SELECT]: async () => {
//         const characters = await fetchPlayerCharacters();
//         return new CharacterSelect(
//           () => this._changeMenu(MAIN_MENU_STATE.LOGIN),
//           () => this._changeMenu(MAIN_MENU_STATE.CHARACTER_CREATE),
//           characters ?? [],
//         );
//       },
//       [MAIN_MENU_STATE.CHARACTER_CREATE]: async () => {
//         const races = await fetchRaces();
//         return new CharacterCreate(races, () => this._changeMenu(MAIN_MENU_STATE.CHARACTER_SELECT));
//       },
//     };
//     this.#menu = AdvancedDynamicTexture.CreateFullscreenUI(this.#menuState.toString());
//     this.#menu.addControl(this.#main_menu_states[this.#menuState]() as Control);

//     this.#assetsManager.load();
//     this.#assetsManager.onFinish = () => {
//       scene.lights.forEach(light => {
//         light.intensity = 10;
//       });
//       this.#currentAnimation.onAnimationGroupLoopObservable.add(() => {
//         if (this.#currentLoop === this.#animationLoopCount) {
//           this.#currentAnimation.pause();
//           const randomAnimationIndex = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
//           const randomIdle = this.#scene.animationGroups[randomAnimationIndex];
//           randomIdle.onAnimationGroupLoopObservable.add(() => {
//             randomIdle.pause();
//             this.#currentAnimation.play(true);
//           });
//           randomIdle.play(true);

//           this.#currentLoop = 0;
//           this.#animationLoopCount = Math.floor(Math.random() * 10) + 1;
//         }
//         this.#currentLoop++;
//       });
//       engine.runRenderLoop(function () {
//         scene.render();
//       });
//       window.addEventListener('keydown', ev => {
//         // Shift+Ctrl+I
//         if (ev.shiftKey && ev.ctrlKey && ev.key === 'I') {
//           if (this.#scene.debugLayer.isVisible()) {
//             this.#scene.debugLayer.hide();
//           } else {
//             this.#scene.debugLayer.show();
//           }
//         }
//       });
//     };
//   }

//   loadZone(zoneName: string = 'rook_tower_02_14_2025') {
//     this.#assetsManager.addMeshTask(
//       'zone',
//       null,
//       `${process.env.SERVER_FILE_URL}:${process.env.SERVER_FILE_PORT}/models/zones/`,
//       `${zoneName}.glb`,
//     );
//   }

//   loadCharacter(race: Race, gender: Gender) {
//     const task = this.#assetsManager.addMeshTask(
//       `${race}_${gender}`,
//       null,
//       `${process.env.SERVER_FILE_URL}:${process.env.SERVER_FILE_PORT}/models/characters/${race}_${gender}/`,
//       `${race}_${gender}.glb`,
//     );
//     task.onSuccess = task => {
//       task.loadedMeshes[0].position = new Vector3(0, 3.5, 5.5);
//       this.#currentAnimation = task.loadedAnimationGroups[1];
//       this.#currentAnimation.play(true);
//       this.#camera.lockedTarget = task.loadedMeshes[0];
//     };
//     this.#assetsManager.load();
//   }
//   private _changeMenu(state: MAIN_MENU_STATE) {
//     this._menuSetter(state);
//   }

//   private async _menuSetter(state: MAIN_MENU_STATE) {
//     this.#menu.getChildren().forEach(child => {
//       child.dispose();
//     });
//     if (this.#main_menu_states[state]() instanceof Promise) {
//       const menuControl = await this.#main_menu_states[state]();
//       this.#menu.addControl(menuControl);
//     } else {
//       this.#menu.addControl(this.#main_menu_states[state]() as Control);
//     }
//   }
// }

export class Game {
  #socket: Socket;
  #scene: Scene;
  constructor(engine: Engine) {
    this.#socket = io(
      `${process.env.SERVER_GAME_URL}:${process.env.SERVER_GAME_PORT}`
    );
    this.#scene = new Scene(engine);
    window.addEventListener('keydown', (ev) => {
      // Shift+Ctrl+I
      if (ev.shiftKey && ev.ctrlKey && ev.key === 'I') {
        console.log('Debug layer');
        if (this.#scene.debugLayer.isVisible()) {
          this.#scene.debugLayer.hide();
        } else {
          this.#scene.debugLayer.show();
        }
      }
    });
    this.#socket.on('connect', () => {
      console.log('Connected to server');
    });
    this.#socket.on('connection:success', () => {
      this.#socket.emit('character:load', 1);
    });
    this.#socket.on('zoneLoaded', async (serializedZone) => {
      console.log('Zone loaded', serializedZone);
      const scene = await LoadSceneAsync(`data:${serializedZone}`, engine);
      console.log('Scene loaded', scene);
      this.#scene = scene;
    });
    this.#socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }
}
