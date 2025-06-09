export const RACE_NAMES = ['HUMAN', 'DWARF', 'ORC', 'GOBLIN'] as const;

export type RaceName = (typeof RACE_NAMES)[number];

export type RaceProps = {
  name: RaceName;
  description: string;
  constitution: number;
  dexterity: number;
  intellect: number;
  might: number;
  perception: number;
  resolve: number;
};

export type RaceQueryResult = RaceProps & {
  id: number;
};
