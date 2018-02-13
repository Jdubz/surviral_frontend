import {
  React,
  observer,
} from 'globalImports';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import { playerStore } from '../../stores';

@observer
class PlayerInfo extends React.Component {
  render() {
    return (
      <div className="playerInfo-container">
        <Paper className="playerInfo-paper">
          <Typography>Hunger</Typography>
          <LinearProgress variant="determinate" value={playerStore.hunger} />
          <br />
          <Typography>Health</Typography>
          <LinearProgress variant="determinate" value={playerStore.health} />
        </Paper>
      </div>
    )
  }
}

export default PlayerInfo;
