import {
  observable,
  action,
} from 'globalImports';

class Item {
  @observable quantity = 0;

  constructor(item, quantity) {
    this.id = item.id;
    this.quantity = quantity;
    this.name = item.name;
    this.description = item.description;
    this.image = item.image;
    this.weight = item.weight;
    this.baseItem = item;
  }

  create(qty) {
    return new Item(this.baseItem, qty);
  }

  @action modStack = (qty) => {
    this.quantity += qty;
    return this.quantity;
  }
  @action split = (qty) => {
    this.quantity -= qty;
    return new Item(this.baseItem, qty);
  }
}

export default Item;