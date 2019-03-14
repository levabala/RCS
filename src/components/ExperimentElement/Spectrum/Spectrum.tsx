import { Button, Card, CardContent, CardHeader, LinearProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import ISpectrum from 'src/entities/ISpectrum';

export interface IProps {
  name: string;
  spectrum?: ISpectrum;
}

export default class Spectrum extends React.Component<IProps> {
  public render() {
    const { spectrum, name } = this.props;

    return (
      <Card>
        <CardHeader title={name} titleTypographyProps={{ variant: "h6" }} />
        <CardContent style={{ paddingTop: 0 }}>
          <Typography>Spectrum progress:</Typography>
          <LinearProgress
            variant="determinate"
            value={(spectrum && spectrum.processedRate) || 0}
          />
          <br />
          <Button disabled={!spectrum || spectrum.processedRate < 1}>
            Download
          </Button>
        </CardContent>
      </Card>
    );
  }
}
