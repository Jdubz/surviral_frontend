import {
  observable,
  action,
  mobx,
  toJS,
  computed,
} from 'globalImports';

class Store {
  @observable hungerMod = -1;
  @observable healthMod = -1;
  @observable hunger = 10;
  @observable health = 10;
  @observable food = 0;
  @observable medicine = 0;
  @observable inventory = new Map();
  @observable moveSpeed = 1;

  @action modHunger = (newHunger) => {
    this.hunger = newHunger;
  };
  @action modHealth = (newHealth) => {
    this.health = newHealth;
  };
  @action modFood = (newFood) => {
    this.food = newFood;
  };
  @action modMeds = (newMeds) => {
    this.medicine = newMeds;
  };
  @action addToInventory = (item) => {
    if (this.inventory.has(item.name)) {
      const addItem = this.inventory.get(item.name);
      addItem.quantity++;
    } else {
      item.quantity = 1;
      this.inventory.set(item.name, item);
    }
  };
  @action removeFromInventory = (item) => {
    if (this.inventory.has(item.name)) {
      const delItem = this.inventory.get(item.name);
      delItem.quantity--;
    } else {
      this.inventory.delete(item);
    }
  };

  @computed get inventoryItems() {
    return toJS(this.inventory);
  };
}

let playerStore = new Store();

module.exports = playerStore;
