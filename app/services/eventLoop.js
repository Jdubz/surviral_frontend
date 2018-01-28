import { timeStore } from '../stores';

const triggerLoop = (action) => {
  console.log('action occurs', action);
};

module.exports = {
  triggerLoop,
};
