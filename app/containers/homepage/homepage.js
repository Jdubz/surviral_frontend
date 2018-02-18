import {
    React,
    observer
} from 'globalImports';

import PlayerInfo from '../playerInfo/playerInfo';
import PlayerInventory from '../playerInfo/playerInventory';
import Log from '../log/log';
import ActionPanel from '../actionPanel/actionPanel';
import LocationPanel from '../locationPanel/locationPanel';
import LocationInventory from '../locationPanel/locationInventory';
import TimeView from '../timeView/timeView';
import DeathNotice from '../deathNotice/deathNotice';
import { playerStore } from "stores";

@observer
class HomePage extends React.Component {
  render() {
    if (playerStore.hunger <= 0 || playerStore.disease <= 0) {
      return <DeathNotice />
    }
    return (<div className="homepage-container">
      <div className="map-wrapper">
        <LocationPanel />
        <Log />
      </div>
      <div className="sidePanel-wrapper">
        <TimeView />
        <PlayerInfo />
        <ActionPanel />
        <PlayerInventory />
        <LocationInventory />
      </div>
    </div>);
  }
}

export default HomePage;
