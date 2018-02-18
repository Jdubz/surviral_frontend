import { Item } from 'models';
import { itemStore } from 'stores';

const roll = (check) => {
  return (Math.ceil(Math.random() * 100)) > check;
};
const qty = (amount) => {
  return Math.ceil(Math.random() * amount);
};

class Location {
  constructor(location) {
    this.id = location.id;
    this.name = location.name;
    this.description = location.description;
    this.inventory = new Map();
    this.itemChance = location.itemChance;
    this.image = location.image;
  }

  addToInventory(item) {
    if (this.inventory.has(item.id)) {
      item.quantity += this.inventory.get(item.id).quantity;
      this.inventory.set(item.id, item);
    }
  }

  takeFromInventory(item) {
    const thisItem = this.inventory.get(item.id);
    if (thisItem.quantity === 1) {
      this.inventory.delete(item.id);
    } else {
      thisItem.quantity += -1;
      this.inventory.set(thisItem.id, thisItem);
    }
  }

  search() {
    Object.values(this.itemChance).forEach(item => {
      if (roll(item.chance)) {
        const newItem = new Item(itemStore.getItem(item.id), qty(item.amount));
        this.addToInventory(newItem);
      }
    });
  }
}

export default Location;
