import {
  observable,
  action,
  toJS,
  computed,
} from 'globalImports';
import items from 'assets/json/items';

class ItemStore {
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

export default ItemStore;
