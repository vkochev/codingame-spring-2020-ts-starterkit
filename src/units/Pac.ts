import { Unit } from './Unit';
import { UnitType } from './UnitType';
import { PointType } from '../map/PointType';
import { distance } from '../map/Distance';
import { State } from '../game/State';
import { GameMap } from '../map/GameMap';

export class Pac extends Unit {
  public constructor(
    id: number,
    x: number,
    y: number,
    type: UnitType,
    public isMine: boolean,
    public speedTurnsLeft: number,
    public abilityCooldown: number
  ) {
    super(id, x, y, type);
  }
}
