import {
    observable,
    action,
    mobx,
    toJS,
    computed,
} from 'globalImports';

import { playerStore, locationStore, actionStore } from '../stores';
import actions from 'assets/json/actions.json';

console.log(actions);

var parseMapFromString = (instr) => {
    let splitString = instr.split(",");
    let map = {};
    splitString.forEach((keyValue) => {
        let [key, value] = keyValue.split(":");
        value = parseInt(value);
        map[key] = value;
    });
    return map;
};

var findActionPrereqs = (action) => {
    if (action.prereq === "" || action.prereq === null || action.prereq === undefined) {
        return;
    }
    console.log(action.prereq);
    action.prereq = parseMapFromString(action.prereq);
};

module.exports.addValidActions = () => {
    console.log(playerStore.inventoryItems);
    console.log(locationStore.inventoryItems);
    console.log(actions.map(findActionPrereqs));
}
