import {
  React,
  observer,
} from 'globalImports';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import { playerStore } from '../../stores';

@observer
class PlayerInfo extends React.Component {
  render() {
    return (
      <div className="playerInfo-container">
        <Grid item xs={12}>
          <Paper className="homepage-paper">
            <Typography type="headline" component="h3">Player Info</Typography>
            <Typography type="headline" component="h4">Hunger</Typography>
            <LinearProgress mode="determinate" value={playerStore.hunger * 10} />
            <br />
            <Typography type="body1">{`Food: ${playerStore.food}`}</Typography>
            <Button raised={true} onClick={() => {
              console.log('Eat Food');
            }}>Eat</Button>
            <Typography type="headline" component="h4">Health</Typography>
            <LinearProgress mode="determinate" value={playerStore.health * 10} />
            <Typography type="body1">{`Meds: ${playerStore.medicine}`}</Typography>
            <Button raised={true} onClick={() => {
              console.log('Use Meds');
            }}>Use</Button>
          </Paper>
        </Grid>
      </div>
    )
  }
}

export default PlayerInfo;