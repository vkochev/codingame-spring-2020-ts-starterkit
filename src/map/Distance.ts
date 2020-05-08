import { PointType } from './PointType';

export function distance(
  { x: x1, y: y1 }: PointType,
  { x: x2, y: y2 }: PointType
) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
