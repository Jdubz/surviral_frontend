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
import sounds from 'assets/json/sounds.json';

const parseMapFromString = (inStr) => {
    if (inStr === "" || inStr === null || inStr === undefined) {
        return inStr;
    }

    let splitString = inStr.split(",");
    let map = {};
    splitString.forEach((keyValue) => {
        let [key, value] = keyValue.split(":");
        value = parseInt(value);
        map[key] = value;
    });
    return map;
};

const parseAction = (action) => {
    action.prereq = parseMapFromString(action.prereq);
    action.player_effects = parseMapFromString(action.player_effects);
    action.sound = sounds.find((sound) => action.sound_effect === sound.id);
    return action;
};

const validateAction = (action) => {
    let valid = true;
    if (action.type === "search") {
        return locationStore.location !== null;
    }
    //console.log('validateAction', locationStore.inventoryItems, action);
    Object.keys(action.prereq).forEach((prereq) => {
        let prereqInPlayerInventory = playerStore.inventoryItems.hasOwnProperty(prereq);
        let prereqInLocationInventory = locationStore.location && locationStore.inventoryItems.hasOwnProperty(prereq);
        if (!prereqInLocationInventory && !prereqInPlayerInventory) {
            valid = false;
        }
    });
    return valid;
};

let _actions = actions.map(parseAction);

module.exports.getValidActions = () => {
    console.log(locationStore.location);
    return _actions.filter(validateAction);
};
