import { Attribute as AttributeName } from '@dungeon-delvers/types';
export const ATTRIBUTE_MAX_VALUE = 18;
export const ATTRIBUTE_MIN_VALUE = 3;

type AttributeValues = Record<AttributeName, number>;

class Attribute {
  private _value: number;
  constructor(_value: number) {
    if (!this.attributeWithinBounds(_value)) {
      throw new Error(
        `Attribute value ${_value} is not within the bounds of ${ATTRIBUTE_MIN_VALUE} and ${ATTRIBUTE_MAX_VALUE}`
      );
    }
    this._value = _value;
  }
  get value() {
    return this._value;
  }
  set value(_value) {
    this._value = _value;
  }
  attributeWithinBounds(value: number) {
    return value >= ATTRIBUTE_MIN_VALUE && value <= ATTRIBUTE_MAX_VALUE
      ? true
      : false;
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

export class Attributes {
  #attributes: Record<AttributeName, Attribute> | {} = {};
  constructor(attributes: AttributeValues) {
    this.#attributes['CON'] = new Constitution(attributes['CON']);
    this.#attributes['DEX'] = new Dexterity(attributes['DEX']);
    this.#attributes['INT'] = new Intellect(attributes['INT']);
    this.#attributes['MIG'] = new Might(attributes['MIG']);
    this.#attributes['PER'] = new Perception(attributes['PER']);
    this.#attributes['RES'] = new Resolve(attributes['RES']);
  }

  setAttributes(attributes: AttributeValues) {
    this.#attributes['CON'] = new Constitution(attributes['CON']);
    this.#attributes['DEX'] = new Dexterity(attributes['DEX']);
    this.#attributes['INT'] = new Intellect(attributes['INT']);
    this.#attributes['MIG'] = new Might(attributes['MIG']);
    this.#attributes['PER'] = new Perception(attributes['PER']);
    this.#attributes['RES'] = new Resolve(attributes['RES']);
  }

  getAttributes() {
    return this.#attributes;
  }

  setAttribute(attribute: AttributeName, value: number) {
    this.#attributes[attribute].value = value;
  }

  getAttribute(attribute: AttributeName) {
    return this.#attributes[attribute];
  }
}
