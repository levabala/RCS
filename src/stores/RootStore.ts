import { configure } from 'mobx';

import { DomainStore } from './DomainStore';
import { UIStore } from './UIStore';

configure({ enforceActions: "observed" });

class RootStore {
  public domainStore: DomainStore = new DomainStore();
  public uiStore: UIStore = new UIStore();
}

const rootStore = new RootStore();
export default rootStore;
