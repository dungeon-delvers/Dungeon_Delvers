export const DEFENSE_TYPES = [
  'deflection',
  'fortitude',
  'reflex',
  'willpower',
] as const;

export type DefenseType = (typeof DEFENSE_TYPES)[number];

export type DefenseStats = Record<DefenseType, number>;
