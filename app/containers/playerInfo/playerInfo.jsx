import {
  React,
  observer,
} from 'globalImports';

import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import { playerStore } from '../../stores';

@observer
class PlayerInfo extends React.Component {
  render() {
    return (
      <section className="playerInfo-container">
        <Typography>Hunger</Typography>
        <LinearProgress variant="determinate" value={playerStore.hunger} />
        <br />
        <Typography>Virus</Typography>
        <LinearProgress variant="determinate" value={playerStore.disease} />
      </section>
    )
  }
}

export default PlayerInfo;
