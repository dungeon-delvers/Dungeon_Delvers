import {
  Constitution,
  Dexterity,
  Intellect,
  Might,
  Perception,
  Resolve,
} from './attribute';
import { randomChoice } from './random';

const attributes = [
  Constitution,
  Dexterity,
  Intellect,
  Might,
  Perception,
  Resolve,
];

describe('Attributes', () => {
  test('Calculate modifier', () => {
    const Attribute = randomChoice(attributes);
    expect(new Attribute(6).calculateModifier(0.05)).toBe(-0.2);
    expect(new Attribute(8).calculateModifier(0.05)).toBe(-0.1);
    expect(new Attribute(10).calculateModifier(0.05)).toBe(0);
    expect(new Attribute(12).calculateModifier(0.05)).toBe(0.1);
    expect(new Attribute(14).calculateModifier(0.05)).toBe(0.2);
  });
});
