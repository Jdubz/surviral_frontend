import {
  observable,
  action,
  mobx,
  toJS,
} from 'globalImports';

class Store {
  @observable food = 0;
  @observable medicine = 0;
  @observable inventory = new Map();

  @action modFood = (newFood) => {
    this.food = newFood;
  };
  @action modMeds = (newMeds) => {
    this.medicine = newMeds;
  };
  @action addToInventory = (item) => {
    this.inventory.set(item.name, item);
  };
  @action removeFromInventory = (key) => {
    this.inventory.delete(key);
  };

  @computed inventoryItems() {
    return toJS(this.inventory;)
  };
}

let locationStore = new Store();

module.exports = locationStore;