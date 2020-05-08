import { readMap, readState } from './Read';
import { GameMap } from '../map/GameMap';
import { wood1MapInput, wood1StateInput } from './Read.testdata.wood1';
import { getNextCommands } from '../ai';
import { bronzeMapInput, bronzeStateInput } from './Read.testdata.bronze';

function readlineStub(input: string) {
  const rows = input.split('\n');
  return () => rows.shift() || '';
}
test('reads map', () => {
  const map = readMap(
    readlineStub(`5 3
#####
#    
# #  `)
  );

  expect(map.cells.length).toBe(3);
  expect(map.height).toBe(3);
  expect(map.cells[0].length).toBe(5);
  expect(map.width).toBe(5);

  expect(map.cells[2][4]).toBe(true);
  expect(map.cells[0][0]).toBe(false);
  expect(map.cells[1][1]).toBe(true);
  expect(map.cells[2][2]).toBe(false);
});

test('reads state', () => {
  const map = new GameMap(
    3,
    3,
    Array.from(Array(3)).map(() => Array.from(Array(3)).fill('Floor'))
  );
  const state = readState(
    readlineStub(`100 2
3
4 0 1 2 Opponent -1 3
4 1 2 2 Pac -2 4
0 0 0 1 Opponent 1 1
2
2 1 101
1 1 202`),
    map
  );

  expect(Object.values(state.myPacs).length).toBe(1);
  expect(Object.values(state.opponentPacs).length).toBe(2);

  expect(Object.values(state.pelletPositions).length).toBe(3);
  expect(Object.values(state.pelletPositions[0]).length).toBe(3);

  expect(Object.values(state.unitPositions).length).toBe(3);
  expect(Object.values(state.unitPositions[0]).length).toBe(3);

  expect(state.pellets.length).toBe(2);
  expect(state.pellets[0].x).toBe(2);
  expect(state.pellets[1].y).toBe(1);
  expect(state.pellets[0].value).toBe(101);
  expect(state.pellets[1].value).toBe(202);

  expect(state.myScore).toBe(100);
  expect(state.opponentScore).toBe(2);
  expect(state.visiblePacCount).toBe(3);
});

test('reads wood 1 map', () => {
  const map = readMap(readlineStub(wood1MapInput));

  expect(map.cells.length).toBe(12);
  expect(map.height).toBe(12);
  expect(map.cells[0].length).toBe(35);
  expect(map.width).toBe(35);

  expect(map.cells[10][22]).toBe(false);
  expect(map.cells[10][23]).toBe(true);
  expect(map.cells[10][24]).toBe(false);
});

test('reads wood 1 state', () => {
  const map = readMap(readlineStub(wood1MapInput));
  const state = readState(readlineStub(wood1StateInput), map);

  expect(Object.values(state.myPacs).length).toBe(5);
  expect(Object.values(state.opponentPacs).length).toBe(5);

  expect(Object.values(state.pelletPositions).length).toBe(12);
  expect(Object.values(state.pelletPositions[0]).length).toBe(35);
  expect(state.pelletPositions[9][7]).not.toBeUndefined();
  expect(state.pelletPositions[10][11]).not.toBeUndefined();
  expect(state.pelletPositions[9][11]).not.toBeUndefined();

  expect(Object.values(state.unitPositions).length).toBe(12);
  expect(Object.values(state.unitPositions[0]).length).toBe(35);
  expect(state.pellets.length).toBe(181);
  expect(state.visiblePacCount).toBe(10);
});

test('commands wood 1', () => {
  const map = readMap(readlineStub(wood1MapInput));
  const state = readState(readlineStub(wood1StateInput), map);

  getNextCommands(state);
});

test('reads bronze map', () => {
  const map = readMap(readlineStub(bronzeMapInput));

  expect(map.cells.length).toBe(13);
  expect(map.height).toBe(13);
  expect(map.cells[0].length).toBe(35);
  expect(map.width).toBe(35);

  expect(map.cells[3][26]).toBe(false);
  expect(map.cells[3][27]).toBe(true);
  expect(map.cells[3][28]).toBe(false);
});

test('reads bronze state', () => {
  const map = readMap(readlineStub(bronzeMapInput));
  const state = readState(readlineStub(bronzeStateInput), map);

  expect(Object.values(state.myPacs).length).toBe(4);
  expect(Object.values(state.opponentPacs).length).toBe(2);

  expect(Object.values(state.pelletPositions).length).toBe(13);
  expect(Object.values(state.pelletPositions[0]).length).toBe(35);
  expect(state.pelletPositions[11][14]).not.toBeUndefined();
  expect(state.pelletPositions[9][28]).not.toBeUndefined();
  expect(state.pelletPositions[1][0]).not.toBeUndefined();

  expect(Object.values(state.unitPositions).length).toBe(13);
  expect(Object.values(state.unitPositions[0]).length).toBe(35);
  expect(state.pellets.length).toBe(33);
  expect(state.visiblePacCount).toBe(6);

  expect(state.opponentPacs[2].type).toBe('SCISSORS');
});

test('commands bronze', () => {
  const map = readMap(readlineStub(wood1MapInput));
  const state = readState(readlineStub(wood1StateInput), map);

  getNextCommands(state);
});
