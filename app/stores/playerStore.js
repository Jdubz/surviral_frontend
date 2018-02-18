import {
  observable,
  action,
  toJS,
  computed,
} from 'globalImports';
import { Item } from '../models';

class PlayerStore {
  @observable hunger = 100;
  @observable disease = 100;
  @observable carryingCapacity = 80;
  @observable inventory = new Map();

  @action modInventory = (item) => {
    if (this.inventory.has(item.id)) {
      const Item = this.inventory.get(item.id);
      Item.quantity += item.quantity;
      this.inventory.set(item.id, Item);
    } else {
      this.inventory.set(item.id, new Item(item));
    }
  };

  @computed get inventoryItems() {
    return toJS(this.inventory);
  };
}

export default PlayerStore;
