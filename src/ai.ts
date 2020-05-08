import { State } from './game/State';
import { getSwitchTypeCommand } from './output/actions';

export function getNextCommands(state: State) {
  return Object.values(state.myPacs).map((p) =>
    getSwitchTypeCommand(p, 'NEUTRAL')
  );
}
