import { Item } from 'models';
import { itemStore } from 'stores';

const roll = (check) => {
  return (Math.ceil(Math.random() * 100)) < check;
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
      this.inventory.get(item.id).modStack(item.quantity);
    } else {
      this.inventory.set(item.id, item);
    }
  }
  takeFromInventory(itemId, qty) {
    const takenItems = this.inventory.get(itemId).split(qty);
    if (this.inventory.get(itemId).quantity <= 0) {
      this.inventory.delete(itemId);
    }
    return takenItems;
  }
  deleteFromInventory(itemId, qty) {
    const qtyLeft = this.inventory.get(itemId).modStack(qty);
    if (qtyLeft <= 0) {
      this.inventory.delete(itemId);
    }
    return qtyLeft;
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
