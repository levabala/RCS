import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { action, observable } from 'mobx';

export class UIStore {
  @observable
  public currentTheme: Theme = createMuiTheme({
    palette: {
      primary: {
        main: "#b2dfdb"
      },
      secondary: {
        main: "#7986cb"
      }
    },
    typography: {
      useNextVariants: true
    }
  });

  @action
  public updateTheme(theme: Theme) {
    this.currentTheme = theme;
  }
}
