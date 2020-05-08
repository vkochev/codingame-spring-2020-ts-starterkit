const battleTypes = ['ROCK', 'PAPER', 'SCISSORS'] as const;

export type UnitType = 'NEUTRAL' | 'DEAD' | typeof battleTypes[number];
