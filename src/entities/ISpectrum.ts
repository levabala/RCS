import { Duration, Interval } from 'luxon';

import IPoint from './IPoint';

export default interface ISpectrum {
  dateRage: Interval;
  points: IPoint[];
  processedRate: number;
  processingTime: Duration;
  maxX: number;
  maxY: number;
  minX: number;
  miny: number;
}
