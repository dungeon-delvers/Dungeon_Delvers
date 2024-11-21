type BaseColors = {
  gray: Record<number, string>;
  green: Record<number, string>;
  red: Record<number, string>;
  blue: Record<number, string>;
  gold: Record<number, string>;
};

type Selectors = {
  primary: string;
  secondary: string;
  disabled: string;
};
type Colors = {
  black: {
    primary: string;
    secondary: string;
  };
  white: {
    primary: string;
    secondary: string;
  };
  gray: BaseColors['gray'] & {
    primary: string;
    secondary: string;
    background: string;
  };
  green: BaseColors['green'] & Selectors;
  red: BaseColors['red'] & Selectors;
  blue: BaseColors['blue'] & Selectors;
  gold: BaseColors['gold'] & Selectors;
};
export const baseColors = {
  gray: {
    0: '#353135',
    1: '#4A454A',
    2: '#5F595F',
    3: '#746D74',
    4: '#888188',
    5: '#9C969C',
    6: '#B0ABB0',
    7: '#C4C0C4',
    8: '#D7D5D7',
    9: '#EBEAEB',
  },
  green: {
    0: '#18251C',
    1: '#304A38',
    2: '#385641',
    3: '#496F54',
    4: '#598866',
    5: '#6B9E79',
  },
  red: {
    0: '#5C3333',
    1: '#764141',
    2: '#874A4A',
    3: '#A86161',
    4: '#B77B7B',
    5: '#C59696',
  },
  blue: {
    0: '#1B2B36',
    1: '#294151',
    2: '#37576D',
    3: '#446D88',
    4: '#5282A3',
    5: '#6A96B4',
  },
  gold: {
    0: '#544426',
    1: '#715A33',
    2: '#8D703F',
    3: '#A9874C',
    4: '#B4935A',
    5: '#B4935A',
  },
};

export const colors: Colors = {
  black: {
    primary: baseColors.gray[0],
    secondary: baseColors.gray[1],
  },
  white: {
    primary: baseColors.gray[9],
    secondary: baseColors.gray[8],
  },
  gray: {
    ...baseColors.gray,
    primary: baseColors.gray[4],
    secondary: baseColors.gray[6],
    background: 'rgba(53, 49, 53, 0.85)',
  },
  green: {
    ...baseColors.green,
    primary: baseColors.green[4],
    secondary: baseColors.green[1],
    disabled: '#4A544D',
  },
  red: {
    ...baseColors.red,
    primary: baseColors.red[2],
    secondary: baseColors.red[0],
    disabled: '#716060',
  },
  blue: {
    ...baseColors.blue,
    primary: baseColors.blue[2],
    secondary: baseColors.blue[0],
    disabled: '#4C5357',
  },
  gold: {
    ...baseColors.gold,
    primary: baseColors.gold[4],
    secondary: baseColors.gold[2],
    disabled: '#8E8981',
  },
};
