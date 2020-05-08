import { GameMap } from '../map/GameMap';
import { Pac } from '../units/Pac';
import { Pellet } from './Pellet';
import { DictionaryType } from './DictionaryType';
import { PointType } from '../map/PointType';

export class State {
  public constructor(
    public map: GameMap,
    public myPacs: DictionaryType<Pac>,
    public opponentPacs: DictionaryType<Pac>,
    public unitPositions: (number | undefined)[][],
    public pellets: Array<Pellet>,
    public pelletPositions: (number | undefined)[][],
    public myScore: number,
    public opponentScore: number,
    public visiblePacCount: number,
    public visiblePelletCount: number
  ) {}
}
