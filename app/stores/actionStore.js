import {
  observable,
  action,
  toJS,
  computed,
} from 'globalImports';
import { Action } from '../models';
import actions from 'assets/json/actions.json';

class ActionStore {
  @observable availableActions = new Map();
  @observable actionBank = new Map();

  @action populateBank = () => {
    actions.forEach(action => {
      this.actionBank.set(action.id, new Action(action));
    });
  };
  @action populateAvailable = () => {
    this.availableActions.clear();
    this.actionBank.forEach(action => {
      if (action.checkRequirements()) {
        this.availableActions.set(action.id, action);
      }
    })
  };

  @computed get allActions() {
    return toJS(this.actionBank);
  }
  @computed get currentActions() {
    return toJS(this.availableActions);
  }
}

export default ActionStore;
