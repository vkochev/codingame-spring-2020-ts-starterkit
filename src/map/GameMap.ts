import { PointType } from './PointType';

export class GameMap {
  public constructor(
    public width: number,
    public height: number,
    public cells: boolean[][]
  ) {}

  public get directions() {
    return this.dirs;
  }
  public getNearestPoints({ x, y }: PointType) {
    return this.dirs.map(([dx, dy]) =>
      this.checkHorizontalEdge({ x: x + dx, y: y + dy })
    );
  }

  public checkHorizontalEdge({ x, y }: PointType): PointType {
    const maxX = this.width - 1;
    if (x < 0) {
      return { y, x: maxX };
    }
    if (x > maxX) {
      return { y, x: 0 };
    }
    return { x, y };
  }

  private dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
}
