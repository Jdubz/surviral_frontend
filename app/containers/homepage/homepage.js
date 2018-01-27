import {
    React,
    observer
} from 'globalImports';

import navStore from '../../stores/navStore';

@observer
class HomePage extends React.Component {
  render() {
    return (<div className="homepage-container">
      <h1>homepage</h1>
      <p>{navStore.page}</p>
    </div>);
  }
}

export default HomePage;
