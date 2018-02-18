import {
  observable,
  computed,
  action,
  toJS,
} from 'globalImports';

class LogStore {
  @observable logEntries = new Array();

  @action addEntry = (entry) => {
    this.logEntries.push(entry);
  };

  @computed get entries() {
    return toJS(this.logEntries);
  };
}

let logStore = new LogStore();

export default logStore;
