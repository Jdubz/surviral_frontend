import {
    React,
    observer
} from 'globalImports';

import PlayerInfo from '../playerInfo/playerInfo';
import ActionPanel from '../actionPanel/actionPanel';
import DeathNotice from '../deathNotice/deathNotice';
import NavigatorPanel from '../navigatorPanel/navigatorPanel';

import { playerStore } from 'stores';
import { locationStore } from 'stores';
import images from 'assets/images';

@observer
class Game extends React.Component {
  render() {
    if (playerStore.state === 'dead') {
      return <DeathNotice />
    }
    return (
      <div className="game-container" style={{backgroundImage: `url('${images[locationStore.location.image]}')`}}>
        <PlayerInfo />
        <div className="game-container__viewport"></div>
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
