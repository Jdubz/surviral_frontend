import { timeStore, playerStore, actionStore } from "stores";

const eventLoop = (time) => {
  timeStore.passTime(time);
  playerStore.passTime(time);
  actionStore.populateAvailable();
};

export {
  eventLoop,
}