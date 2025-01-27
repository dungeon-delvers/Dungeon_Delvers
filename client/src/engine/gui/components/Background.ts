import { Rectangle } from '@babylonjs/gui';

import { colors } from './colors';

export default class Background extends Rectangle {
  constructor(name) {
    super(name);
    this.background = colors.gray[1];
    this.color = colors.gold.primary;
    this.cornerRadius = 5;
    this.onPointerEnterObservable.add(() => this.pointerEnterObservable());
    this.onPointerOutObservable.add(() => this.pointerOutObservable());
  }
  pointerEnterObservable() {
    this.background = colors.gray[2];
  }
  pointerOutObservable() {
    this.background = colors.gray[1];
  }
}
