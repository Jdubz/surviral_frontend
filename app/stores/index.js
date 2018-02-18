import LocationStore from './locationStore';
import PlayerStore from './playerStore';
import LogStore from './logStore';
import TimeStore from './timeStore';
import AudioStore from './audioManagerStore';
import ItemStore from './itemStore';
import ActionStore from './actionStore';

const audioStore = new AudioStore();
const timeStore = new TimeStore();
const playerStore = new PlayerStore();
const logStore = new LogStore();
const locationStore = new LocationStore();
const itemStore = new ItemStore();
const actionStore = new ActionStore();

itemStore.populateItems();
locationStore.populateLocations();
actionStore.populateBank();

// actionStore.populateAvailable();
// ToDO: this is done in actionPanel due to execution order, should be done here

export {
  audioStore,
  locationStore,
  playerStore,
  logStore,
  actionStore,
  timeStore,
  itemStore,
};
