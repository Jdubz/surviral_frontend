import {
  React,
  observer,
} from 'globalImports';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import { playerStore } from '../../stores';

@observer
class PlayerInfo extends React.Component {
  render() {
    console.log(playerStore.inventoryItems);
    return (
      <div className="playerInfo-container">
        <Grid item xs={12}>
          <Paper className="homepage-paper">
            <Typography type="headline" component="h3">Player Info</Typography>
            <Typography type="headline" component="h4">Hunger</Typography>
            <LinearProgress mode="determinate" value={playerStore.hunger * 10} />
            <br />
            <Typography type="headline" component="h4">Health</Typography>
            <LinearProgress mode="determinate" value={playerStore.health * 10} />
            <br />
            <Typography type="headline" component="h4">Inventory</Typography>
            <Typography type="body1">{`Food: ${playerStore.food}`}</Typography>
            <Typography type="body1">{`Meds: ${playerStore.medicine}`}</Typography>
            {}
          </Paper>
        </Grid>
      </div>
    )
  }
}

export default PlayerInfo;