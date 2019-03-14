import { Grid } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DevTools, { configureDevtool } from 'mobx-react-devtools';
import * as React from 'react';

import Terminal from './components/Terminal';
import rootStore from './stores/RootStore';

import './App.scss';

// configuring mobX dev console
configureDevtool({
  logEnabled: false,
  logFilter: change =>
    change.type !== "add" &&
    change.type !== "update" &&
    change.type !== "scheduled-reaction",
  updatesEnabled: false
});

class App extends React.Component {
  public render() {
    return (
      <div>
        <DevTools />
        <MuiThemeProvider theme={rootStore.uiStore.currentTheme}>
          <Grid container spacing={24}>
            <Grid item>
              <Terminal />
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
