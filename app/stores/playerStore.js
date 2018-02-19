import {
  observable,
  action,
  toJS,
  computed,
} from 'globalImports';

const playerHourlyMods = {
  hunger: -2,
  disease: -1,
};

class PlayerStore {
  @observable state = 'ok';
  @observable hunger = 100;
  @observable disease = 100;
  @observable carryingCapacity = 80;
  @observable inventory = new Map();

  @action deathCheck() {
    if (this.hunger <= 0 || this.disease <= 0) {
      this.state = 'dead';
    }
  }
  @action passTime(time) {
    this.hunger += (playerHourlyMods.hunger * time);
    this.disease += (playerHourlyMods.disease * time);
    this.deathCheck();
  }
  @action modPlayer(mods) {
    Object.keys(mods).forEach(mod => {
      let newStat = this[mod] + mods[mod];
      if (newStat > 100) {
        newStat = 100;
      }
      this[mod] = newStat;
    });
    this.deathCheck();
  }

  @action addToInventory = (item) => {
    if (this.inventory.has(item.id)) {
      this.inventory.get(item.id).modStack(item.quantity);
    } else {
      this.inventory.set(item.id, item);
    }
  };
  @action deleteFromInventory = (itemId, qty) => {
    const newQty = this.inventory.get(itemId).modStack(qty);
    if (newQty <= 0) {
      this.inventory.delete(itemId);
    }
    return newQty;
  };
  @action takeFromInventory = (itemId, qty) => {
    const item = this.inventory.get(itemId).split(qty);
    if (this.inventory.get(itemId).quantity <= 0) {
      this.inventory.delete(itemId);
    }
    return item;
  };

  @computed get inventoryItems() {
    return toJS(this.inventory);
  };
}

export default PlayerStore;
