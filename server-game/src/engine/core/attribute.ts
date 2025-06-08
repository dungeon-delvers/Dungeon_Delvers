export class Attribute {
  get value() {
    return this._value;
  }
  set value(_value) {
    this._value = _value;
  }
  private _value: number;
  constructor(_value: number) {
    this._value = _value;
  }
  calculateModifier(modifier: number) {
    return (this._value - 10) * modifier;
  }
}

export class Constitution extends Attribute {
  constructor(_value: number) {
    super(_value);
  }
}

export class Dexterity extends Attribute {
  constructor(_value: number) {
    super(_value);
  }
}

export class Intellect extends Attribute {
  constructor(_value: number) {
    super(_value);
  }
}

export class Might extends Attribute {
  constructor(_value: number) {
    super(_value);
  }
}

export class Perception extends Attribute {
  constructor(_value: number) {
    super(_value);
  }
}

export class Resolve extends Attribute {
  constructor(_value: number) {
    super(_value);
  }
}
