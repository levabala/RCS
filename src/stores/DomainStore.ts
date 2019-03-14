import { action, observable } from 'mobx';
import terminalFetcher from 'src/fetchers/terminalFetcher';

export class DomainStore {
  @observable
  public path: string = "./";

  @observable
  public currentDirectory: Array<{
    name: string;
    isDirectory: boolean;
    size: number;
  }> = [];

  public loadDir(path: string) {
    console.log("load dir", path);
    this.updatePath(path);

    // FileTreeFetcher({ path })
    //   .then(res => this.updateCurrentDir(res))
    //   .catch(e => console.log(e));
  }

  public async sendCommand(
    methodName: string,
    args: string[]
  ): Promise<string> {
    return Object.entries(await terminalFetcher(methodName, args))
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  }

  // @action
  // private updateCurrentDir(
  //   files: Array<{
  //     name: string;
  //     isDirectory: boolean;
  //     size: number;
  //   }>
  // ) {
  //   this.currentDirectory = files;
  // }

  @action
  private updatePath(path: string) {
    this.path = path;
  }
}
