import {
    React,
    observer
} from 'globalImports';

import PlayerInfo from '../playerInfo/playerInfo';
import ActionPanel from '../actionPanel/actionPanel';
import DeathNotice from '../deathNotice/deathNotice';
import NavigatorPanel from '../navigatorPanel/navigatorPanel';
import BgImage from '../bgImage';

import { playerStore } from 'stores';
import { locationStore } from 'stores';

@observer
class Game extends React.Component {
  render() {
    if (playerStore.state === 'dead') {
      return <DeathNotice />
    }
    return (
      <div className="game-container" >
        <PlayerInfo />
        <BgImage />
        <div className="game-container__location-description">
          {locationStore.location.description}
        </div>
        <ActionPanel />
        <NavigatorPanel />
      </div>
    );
  }
}

export default Game;
