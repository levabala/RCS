import { Card, CardContent, CardHeader, InputAdornment, RootRef, TextField, Typography } from '@material-ui/core';
import * as interact from 'levabala_interactjs';
import * as React from 'react';
import { createResizeConfig } from 'src/interact/resizable';
import rootStore from 'src/stores/RootStore';

import './Terminal.scss';

export interface IProps {
  children?: React.ReactNode;
}

export interface IState {
  content: string[];
  currentCommand: string;
}

export default class Terminal extends React.Component<IProps, IState> {
  private rootRef = React.createRef();
  constructor(props: IProps) {
    super(props);

    this.state = {
      content: [],
      currentCommand: ""
    };
  }

  public onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value;

    this.setState({ currentCommand: newValue });
  };

  public onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value;

    switch (e.key) {
      case "Enter":
        this.sendCommand(newValue);
        break;
      case "ArrowUp":
        const commands = this.state.content.filter(s => s[0] === ">");
        if (!commands.length) break;

        const lastCommand = commands[commands.length - 1];

        this.setState({ currentCommand: lastCommand.substr(1).trim() });
        this.scrollEndCommandField();
        break;
    }
  };

  public componentDidMount() {
    const elem = this.rootRef.current as HTMLElement;
    interact(elem)
      .resizable(createResizeConfig())
      .styleCursor(true);
  }

  public scrollBottom() {
    const scrollableContainer = (this.rootRef
      .current as HTMLElement).querySelector(
      ".terminal .wrapper .content"
    ) as HTMLElement;
    scrollableContainer.scrollTo(0, scrollableContainer.scrollHeight);
  }

  public scrollEndCommandField() {
    const textField = (this.rootRef.current as HTMLElement).querySelector(
      ".terminal .wrapper .commandField input"
    ) as HTMLInputElement;

    setTimeout(
      () =>
        (textField.selectionStart = textField.selectionEnd =
          textField.value.length)
    );
  }

  public sendCommand(command: string) {
    const arr = command.split(" ").filter(s => s.length);
    if (!arr.length) return;

    rootStore.domainStore
      .sendCommand(arr.shift() as string, arr)
      .then(res => this.pushContentLine(res));

    this.setState({
      content: this.state.content.concat(["", "> " + command]),
      currentCommand: ""
    });

    this.scrollBottom();
  }

  public pushContentLine(line: string) {
    this.setState({
      content: this.state.content.concat([line])
    });

    this.scrollBottom();
  }

  public render() {
    return (
      <RootRef rootRef={this.rootRef}>
        <Card className="terminal">
          <CardHeader className="title" title="Terminal" />
          <div className="sizeController">
            <CardContent className="wrapper">
              <Typography className="content">
                {this.state.content.join("\r\n")}
              </Typography>
              <TextField
                spellCheck={false}
                onKeyDown={this.onKeyDown}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start" className="inputAdornment">
                      {">"}
                    </InputAdornment>
                  )
                }}
                className="commandField"
                value={this.state.currentCommand}
                onChange={this.onInputChange}
              />
            </CardContent>
          </div>
        </Card>
      </RootRef>
    );
  }
}
