export class Attribute {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
  calculateModifier(modifier: number) {
    return (this.value - 10) * modifier;
  }
}

export class Constitution extends Attribute {
  constructor(value: number) {
    super(value);
  }
}

export class Dexterity extends Attribute {
  constructor(value: number) {
    super(value);
  }
}

export class Intellect extends Attribute {
  constructor(value: number) {
    super(value);
  }
}

export class Might extends Attribute {
  constructor(value: number) {
    super(value);
  }
}

export class Perception extends Attribute {
  constructor(value: number) {
    super(value);
  }
}

export class Resolve extends Attribute {
  constructor(value: number) {
    super(value);
  }
}
