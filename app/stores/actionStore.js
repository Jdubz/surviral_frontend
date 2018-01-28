import {
    observable,
    action,
    mobx,
    toJS,
    computed,
} from 'globalImports';

class Store {
    @observable actions = new Map();

    @action addToActions = (action) => {
      this.actions.set(action.name, action);
    };
    @action removeFromActions = (action) => {
        this.actions.delete(action.name);
    };
    @action clearActions = () => {
      this.actions.clear();
    };

    @computed get currentActions() {
        return toJS(this.actions);
    };
}

let actionStore = new Store();

module.exports = actionStore;
