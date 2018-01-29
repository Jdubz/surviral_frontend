import {
  React,
  observer,
} from 'globalImports';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { timeStore } from '../../stores';

@observer
class TimeView extends React.Component {
  render() {
    return (
      <div className="timeView-container">
        <Paper className="timeView-paper">
          <Typography>{`Day: ${timeStore.day}`}</Typography>
          <Typography>{`Hour: ${timeStore.hour}`}</Typography>
        </Paper>
      </div>
    );
  }
}

export default TimeView;
