import { Pac } from '../units/Pac';
import { PointType } from '../map/PointType';
import { UnitType } from '../units/UnitType';

export class PacTarget {
  constructor(public packId: number, public x: number, public y: number) {}
}

export const getMoveCommand = (
  { id }: Pac,
  { x, y }: PointType,
  message: string
) => `MOVE ${id} ${x} ${y} ${message}`;

export const getSwitchTypeCommand = ({ id }: Pac, type: UnitType) =>
  `SWITCH ${id} ${type}`;

export const getSpeedCommand = ({ id }: Pac) => `SPEED ${id}`;

export const PRINT = (commands: string) => console.log(commands);
