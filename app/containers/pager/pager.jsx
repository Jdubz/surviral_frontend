import {
  React,
  observer,
} from 'globalImports';

import HomePage from '../homepage/homepage';
import ExplorePage from '../explorepage/explorepage';
import { navStore } from '../../stores';

@observer
class Pager extends React.Component {
  render() {
    return (
      <div className="pager-container">
        { navStore.page === 'home' ? (<HomePage />) : null}
        { navStore.page === 'explore' ? (<ExplorePage />) : null}
      </div>
    )
  }
}

export default Pager;
