import { Interval } from 'luxon';

import ISpectrum from './ISpectrum';

export interface IExperiment {
  name: string;
  dateRage: Interval;
  lowResolution?: ISpectrum;
  highResolution?: ISpectrum;
  temperature?: ISpectrum;
}
