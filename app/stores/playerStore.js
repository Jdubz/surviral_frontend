import {
  observable,
  action,
  toJS,
  computed,
} from 'globalImports';
import { Item } from '../models';

const playerHourlyMods = {
  hunger: -2,
  disease: -1,
};

class PlayerStore {
  @observable hunger = 100;
  @observable disease = 100;
  @observable carryingCapacity = 80;
  @observable inventory = new Map();

  @action passTime(time) {
    this.hunger += (playerHourlyMods.hunger * time);
    this.disease += (playerHourlyMods.disease * time);
  }

  @action modPlayer(mods) {
    Object.keys(mods).forEach(mod => {
      let newStat = this[mod] + mods[mod];
      if (newStat > 100) {
        newStat = 100;
      }
      this[mod] = newStat;
    });
  }

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
