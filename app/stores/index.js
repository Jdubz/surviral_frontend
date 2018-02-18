import locationStore from './locationStore';
import playerStore from './playerStore';
import logStore from './logStore';
import timeStore from './timeStore';
import audioStore from './audioManagerStore';
import itemStore from './itemStore';
import actionStore from './actionStore';

itemStore.populateItems();
locationStore.populateLocations();
actionStore.populateBank();

// actionStore.populateAvailable();

export {
  audioStore,
  locationStore,
  playerStore,
  logStore,
  actionStore,
  timeStore,
  itemStore,
};
