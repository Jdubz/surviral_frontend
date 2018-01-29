import {
  React,
  observer
} from 'globalImports';

import {
  audioManagerStore,
} from '../../stores';

import audioManager from '../../services/audioManager';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import VolumeMute from 'material-ui-icons/VolumeMute';
import VolumeUp from 'material-ui-icons/VolumeUp';

@observer
class MyMenu extends React.Component {

  render() {
    return (<div className="menu-container" >
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className="header-title">
            SurViral
          </Typography>
          <span>{audioManagerStore.isMuted}</span>
          <IconButton
            className="header-volume-toggle"
            onClick={audioManagerStore.isMuted ? () => audioManagerStore.unmute() : () => audioManagerStore.mute()}
            color="inherit"
          >
            {audioManagerStore.isMuted ?
              <VolumeMute />
            :
              <VolumeUp />
            }
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>);
  }
}

export default MyMenu;
