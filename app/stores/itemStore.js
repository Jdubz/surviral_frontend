import {
  observable,
  action,
  toJS,
} from 'globalImports';

import { Item } from 'models';
import items from 'assets/json/items';

class ItemStore {
  @observable allItems = new Map();
  @observable inventoryOpen = false;

  @action populateItems = () => {
    items.forEach(item => {
      this.allItems.set(item.id, new Item(item, 0));
    })
  };
  @action getItem(id) {
    return toJS(this.allItems.get(id));
  }
}

export default ItemStore;
