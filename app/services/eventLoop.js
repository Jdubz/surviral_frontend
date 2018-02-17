import { timeStore, playerStore, actionStore, audioStore } from '../stores';
import { executeAction } from './actionManager';

const populateActions = () => {
  const availableActions = getValidActions();
  actionStore.clearActions();
  availableActions.forEach((action) => {
    actionStore.addToActions(action);
  });
};

const triggerLoop = (action) => {
    console.log('test');
  if(action.type === "search") {
      findItem();
  }
  dayChange(action);
  populateActions();
};

// create initial state
initialLocations();
populateActions();
module.exports = {
  triggerLoop,
};
