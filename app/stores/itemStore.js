import {
  observable,
  action,
  toJS,
  computed,
} from 'globalImports';
import items from 'assets/json/items';

class Store {
  @observable allItems = new Map();

  @action populateItems = () => {
    items.forEach(item => {
      this.allItems.set(item.id, item);
    })
  };
  @action getItem(id) {
    return toJS(this.allItems.get(id));
  }
}

const itemStore = new Store();

export default itemStore;
