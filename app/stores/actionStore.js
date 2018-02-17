import {
    observable,
    action,
    toJS,
    computed,
} from 'globalImports';
import { Action } from '../models';

class Store {
    @observable actions = new Map();

    @action addToActions = (action) => {
      this.actions.set(action.id, new Action(action));
    };
    @action removeFromActions = (action) => {
        this.actions.delete(action.id);
    };
    @action clearActions = () => {
      this.actions.clear();
    };

    @computed get currentActions() {
        return toJS(this.actions);
    };
}

let actionStore = new Store();

export default actionStore;
