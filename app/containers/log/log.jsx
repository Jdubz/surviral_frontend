import {
    React,
    observer
} from 'globalImports';

import ReactDOM from 'react-dom';
import Typography from 'material-ui/Typography';
import { logStore } from '../../stores';

@observer
class Log extends React.Component {
  render() {
    return (<div className="log-container">
      {logStore.entries.reverse().map((entry, index) => {
        return (
          <p key={index}>{entry}</p>
        );
      })}
    </div>);
  }
  componentDidUpdate () {
    ReactDOM.findDOMNode(this).scrollTo(0,0);
  }
}

export default Log;
