import { Card, CardContent, CardHeader } from '@material-ui/core';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IExperiment } from 'src/entities/IExperiment';

import { Spectrum } from '.';

import './ExperimentElement.scss';

export interface IProps {
  experiment: IExperiment;
}

@observer
export default class ExperimentElement extends React.Component<IProps> {
  public render() {
    const { name, dateRage, lowResolution } = this.props.experiment;
    const duration = dateRage.toDuration();
    return (
      <Card className="experimentElement">
        <CardHeader title={`Exp "${name}"`} />
        <CardContent className="content">
          <div className="stat">
            <span>date:</span>
            <span>{dateRage.start.toLocaleString(DateTime.DATE_MED)}</span>
            <span>duration:</span>
            <span>{duration.toFormat("h'h' m'm' s's'")}</span>
          </div>
          <Spectrum name="Low resolution" spectrum={lowResolution} />
        </CardContent>
      </Card>
    );
  }
}
