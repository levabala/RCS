import { action, observable } from 'mobx';
import CommandFetcher from 'src/fetchers/CommandFetcher';
import FileTreeFetcher from 'src/fetchers/FileTreeFetcher';

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

    FileTreeFetcher({ path })
      .then(res => this.updateCurrentDir(res))
      .catch(e => console.log(e));
  }

  public async sendCommand(
    processorName: string,
    args: string[]
  ): Promise<string> {
    return CommandFetcher({ processorName, args })
      .then(res => res)
      .catch(e => e);
  }

  @action
  private updateCurrentDir(
    files: Array<{
      name: string;
      isDirectory: boolean;
      size: number;
    }>
  ) {
    this.currentDirectory = files;
  }

  @action
  private updatePath(path: string) {
    this.path = path;
  }
}
