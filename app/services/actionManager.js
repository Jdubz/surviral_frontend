import {
    observable,
    action,
    mobx,
    toJS,
    computed,
} from 'globalImports';

import { playerStore, locationStore, actionStore } from '../stores';
import actions from 'assets/json/actions.json';
import items from 'assets/json/items.json';

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
        return action;
    }
    console.log(action.prereq)
    action.prereq = parseMapFromString(action.prereq);
    //console.log('action', action);
    return action;
};

var validateAction = (action) => {
    let prereqs = action.prereq;
    let valid = true;
    Object.keys(prereqs).forEach((prereq) => {
        let prereqInPlayerInventory = playerStore.inventoryItems.hasOwnProperty(prereq);
        let prereqInLocationInventory = locationStore.inventoryItems.hasOwnProperty(prereq);
        if (!prereqInLocationInventory && !prereqInPlayerInventory) {
            valid = false;
        }
    });
    return valid;
};

let _actions = actions.map(findActionPrereqs);

module.exports.getValidActions = () => {
    return _actions.filter(validateAction);
};
