import { Grid } from '@babylonjs/gui';

const menu_id = 'character_create_menu';

export default class CharacterCreate extends Grid {
  constructor() {
    super(menu_id);
    this.addColumnDefinition(0.2);
    this.addColumnDefinition(0.6);
    this.addColumnDefinition(0.2);
  }
}
