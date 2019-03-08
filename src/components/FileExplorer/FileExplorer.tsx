import { Card, TextField } from '@material-ui/core';
import { reaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import rootStore from 'src/stores/RootStore';

import { FileElement } from '.';

import './FileExplorer.scss';

export interface IProps {
  children?: React.ReactNode;
}

export interface IState {
  tempPath: string;
}

@observer
export default class FileExplorer extends React.Component<IProps, IState> {
  private finalizeChangeTimeout: NodeJS.Timeout;
  private finalizeChangeTime = 300;

  constructor(props: IProps) {
    super(props);

    this.state = {
      tempPath: toJS(rootStore.domainStore.path)
    };

    reaction(
      () => rootStore.domainStore.path,
      () => this.setState({ tempPath: rootStore.domainStore.path })
    );
  }

  public componentDidMount() {
    rootStore.domainStore.loadDir("./");
  }

  public onInputPathChange = (e: React.SyntheticEvent) => {
    const newValue = (e.target as HTMLInputElement).value;

    this.setState({ tempPath: newValue });

    clearTimeout(this.finalizeChangeTimeout);
    this.finalizeChangeTimeout = setTimeout(
      () => this.loadPath(newValue),
      this.finalizeChangeTime
    );
  };

  public render() {
    const sortedFiles = rootStore.domainStore.currentDirectory
      // clone
      .map(f => f)
      // sort by size
      .sort((f1, f2) => (f1.size > f2.size ? -1 : 1))
      // sort by directories
      .sort((f1, f2) =>
        !f1.isDirectory && f2.isDirectory
          ? 1
          : f1.isDirectory && !f2.isDirectory
          ? -1
          : 0
      );

    return (
      <Card className="fileExplorer">
        <div className="topContainer">
          <TextField
            className="pathTextfield"
            label="Path"
            value={this.state.tempPath}
            margin="normal"
            onChange={this.onInputPathChange}
          />
        </div>
        <div className="bottomContainer">
          <div className="fileGrid">
            {sortedFiles.map((f, i) => (
              <FileElement
                key={i}
                name={f.name}
                size={f.size}
                isDirectory={f.isDirectory}
              />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  private loadPath = (path: string) => {
    rootStore.domainStore.loadDir(path);
  };
}
