export const DEFENSE_TYPES = [
  'deflection',
  'fortitude',
  'reflex',
  'willpower',
] as const;

export type DefenseStats = Record<DefenseType, number>;

export type DefenseType = (typeof DEFENSE_TYPES)[number];
