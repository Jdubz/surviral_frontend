import { timeStore, playerStore, navStore, actionStore, audioManagerStore } from '../stores';
import { getValidActions } from './actionManager';
import { initialLocations, searchLocation } from './locationManager';

const dayChange = (action) => {
  console.log(action.sound);
  const lastDay = timeStore.day;
  const newDay = timeStore.passTime(action.time);
  let dayDiff = newDay - lastDay;
  let healthChange = 0;
  let hungerChange = 0;
  if (dayDiff) {
    for (dayDiff; dayDiff > 0; dayDiff--) {
      healthChange += playerStore.healthMod;
      hungerChange += playerStore.hungerMod;
    }
  }
  playerStore.modHealth(healthChange);
  playerStore.modHunger(hungerChange);
  if (playerStore.health < 1 || playerStore.hunger < 1) {
    navStore.changePage('dead');
  }
};

const populateActions = () => {
  const availableActions = getValidActions();
  actionStore.clearActions();
  availableActions.forEach((action) => {
    actionStore.addToActions(action);
  });
};

const triggerLoop = (action) => {
  console.log('action occurs', action);
  dayChange(action);
  populateActions();
};

// create initial state
populateActions();
initialLocations();
module.exports = {
  triggerLoop,
};
