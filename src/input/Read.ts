import { MapConsts } from '../map/MapConsts';
import { GameMap } from '../map/GameMap';
import { State } from '../game/State';
import { UnitType } from '../units/UnitType';
import { Pac } from '../units/Pac';
import { Pellet } from '../game/Pellet';
import { DictionaryType } from '../game/DictionaryType';

export function readMap(readLine: typeof readline): GameMap {
  var inputs = readLine().split(' ');
  const width = parseInt(inputs[0]); // size of the grid
  const height = parseInt(inputs[1]); // top left corner is (x=0, y=0)
  const cells = Array.from<boolean[]>(Array(height)).map(() =>
    Array.from<boolean>(Array(width))
  );
  for (let y = 0; y < height; y++) {
    const rowStr = readLine(); // one line of the grid: space " " is floor, pound "#" is wall
    for (let x = 0; x < width; x++) {
      const cellTypeStr = rowStr[x];
      cells[y][x] = cellTypeStr === MapConsts.Floor;
    }
  }
  return new GameMap(width, height, cells);
}

export function readState(readLine: typeof readline, map: GameMap) {
  var inputs = readLine().split(' ');
  const myScore = parseInt(inputs[0]);
  const opponentScore = parseInt(inputs[1]);
  const visiblePacCount = parseInt(readLine());

  const myPacs: DictionaryType<Pac> = {};
  const opponentPacs: DictionaryType<Pac> = {};
  const unitPositions = Array.from<(number | undefined)[]>(
    Array(map.cells.length)
  ).map(() => Array.from<number | undefined>(Array(map.cells[0].length)));

  for (let i = 0; i < visiblePacCount; i++) {
    var inputs = readLine().split(' ');
    const id = parseInt(inputs[0]); // pac number (unique within a team)
    const isMine = inputs[1] !== '0'; // true if this pac is yours
    const x = parseInt(inputs[2]); // position in the grid
    const y = parseInt(inputs[3]); // position in the grid
    const type = inputs[4] as UnitType; // unused in wood leagues
    const speedTurnsLeft = parseInt(inputs[5]); // unused in wood leagues
    const abilityCooldown = parseInt(inputs[6]); // unused in wood leagues
    const pac = new Pac(
      id,
      x,
      y,
      type,
      isMine,
      speedTurnsLeft,
      abilityCooldown
    );

    if (isMine) {
      unitPositions[y][x] = id;
      myPacs[id] = pac;
    } else {
      unitPositions[y][x] = id;
      opponentPacs[id] = pac;
    }
  }

  const visiblePelletCount = parseInt(readLine()); // all pellets in sight
  const pellets = [];
  const pelletPositions = Array.from<(number | undefined)[]>(
    Array(map.cells.length)
  ).map(() =>
    Array.from<number | undefined>(Array(map.cells[0].length)).fill(0)
  );
  const visiblePelletPositions = Array.from<(number | undefined)[]>(
    Array(map.cells.length)
  ).map(() => Array.from<number | undefined>(Array(map.cells[0].length)));

  for (let i = 0; i < visiblePelletCount; i++) {
    var inputs = readLine().split(' ');
    const x = parseInt(inputs[0]);
    const y = parseInt(inputs[1]);
    const value = parseInt(inputs[2]); // amount of points this pellet is worth
    const pellet = new Pellet(x, y, value);
    const id = pellets.length;

    pellets.push(pellet);
    pelletPositions[y][x] = id;
    visiblePelletPositions[y][x] = id;
  }

  const state = new State(
    map,
    myPacs,
    opponentPacs,
    unitPositions,
    pellets,
    pelletPositions,
    myScore,
    opponentScore,
    visiblePacCount,
    visiblePelletCount
  );
  return state;
}
