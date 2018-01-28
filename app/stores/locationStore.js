import {
  observable,
  action,
  mobx,
  toJS,
  computed,
} from 'globalImports';

import locations from 'assets/json/locations.json'

var calculateItemsRatio = (location) => {
    let splitItems = location.items.split(",");
    let items = {};
    let totalCount = 0;
    splitItems.forEach((item) => {
        let [name, count] = item.split(":");
        count = parseInt(count);
        items[name] = count;
        totalCount += count;
    });

    Object.keys(items).map((name) => {
        items[name] = items[name] / totalCount;
    });

    location.items = items;
};

// this contains the ratio of items with their ids
const _locations = locations.map(calculateItemsRatio);

class Store {
  @observable id = 12345
  @observable description = 'There is nothing interesting here';
  @observable food = 0;
  @observable medicine = 0;
  @observable inventory = new Map();

  @action modDescription = (newDescription) => {
    this.description = newDescription;
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
      this.inventory.delete(item.name);
    }
  };

  @computed get inventoryItems() {
    return toJS(this.inventory);
  };
}

let locationStore = new Store();

module.exports = locationStore;
