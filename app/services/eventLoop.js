import { timeStore, playerStore, navStore } from '../stores';

const dayChange = (lastDay, newDay) => {
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

const triggerLoop = (action) => {
  console.log('action occurs', action);
  const nowDay = timeStore.day;
  const newDay = timeStore.passTime(action.time);
  dayChange(newDay, nowDay);
};

module.exports = {
  triggerLoop,
};
