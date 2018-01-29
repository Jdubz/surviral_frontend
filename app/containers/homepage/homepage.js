import {
    React,
    observer
} from 'globalImports';

import ExplorePage from '../explorepage/explorepage';
import PlayerInfo from '../playerInfo/playerInfo';
import PlayerInventory from '../playerInfo/playerInventory';
import Log from '../log/log';
import ActionPanel from '../actionPanel/actionPanel';
import LocationPanel from '../locationPanel/locationPanel';
import LocationInventory from '../locationPanel/locationInventory';
import TimeView from '../timeView/timeView';

@observer
class HomePage extends React.Component {
  render() {
    return (<div className="homepage-container">
      <div className="map-wrapper">
        <ExplorePage />
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
