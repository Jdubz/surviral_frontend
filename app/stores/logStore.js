import {
  observable,
  computed,
  action,
  toJS,
} from 'globalImports';

class LogStore {
  @observable logEntries = [];

  @action addEntry = (entry) => {
    this.logEntries.push(entry);
  };

  @computed get entries() {
    return toJS(this.logEntries);
  };
}

export default LogStore;
