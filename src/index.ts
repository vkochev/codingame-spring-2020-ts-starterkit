import { readMap, readState } from './input/Read';
import { getNextCommands } from './ai';
import { PRINT } from './output/actions';

const readLine = readline; // readline;
const map = readMap(readLine);
while (true) {
  const state = readState(readLine, map);
  const commands = getNextCommands(state);

  PRINT(commands.join('|'));
}
