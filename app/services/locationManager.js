import {
    observable,
    action,
    mobx,
    toJS,
    computed,
} from 'globalImports';

import { playerStore, locationStore, actionStore } from '../stores';
import locations from 'assets/json/locations.json';
import items from 'assets/json/items.json';

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

const calculateItemsRatio = (location) => {
    let _items = parseMapFromString(location.items);
    const reducer = (accumulator, item) => accumulator + item;
    let totalCount = Object.values(_items).reduce(reducer, 0);
    Object.keys(_items).map((name) => {
        _items[name] = _items[name] / totalCount;
    });

    location.items = _items;
    return location;
};

// this contains the ratio of items with their ids
const _locations = locations.map(calculateItemsRatio);
const _travel_location = _locations.filter((location) => { return location.id === "wasteland"; })[0];
const _home_location = locations.filter((location) => { return location.id === "house"; })[0];

const searchLocation = (location) => {
    console.log(location)
    const rand = Math.random();
    let min = 0.0;

    let item = Object.keys(location.items).find((item) => {
        const percent = location.items[item];
        const max = min + percent;
        let valid = rand >= min && rand < max;
        min += percent;
        return valid;
    });
    return item;
};

const initialLocations = () => {
    // this only is for testing sake, we will most likely add them as we go
    _locations.forEach((location) => {
        locationStore.addKnownLocation(location);
    });
    locationStore.changeLocation(1);
    console.log(locationStore.location)
};

const findItem = () => {
    const item = searchLocation(locationStore.location);
    console.log(location.knownLocationId, item);
    locationStore.addToInventory(location.knownLocationId, item);
};

module.exports = {
    searchLocation,
    initialLocations,
    findItem
};
