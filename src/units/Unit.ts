import { UnitType } from './UnitType';

export class Unit {
  public constructor(
    public id: number,
    public x: number,
    public y: number,
    public type: UnitType
  ) {}
}
