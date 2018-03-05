import {
    React,
    observer
} from 'globalImports';

import { locationStore } from 'stores';
import locations from 'assets/json/locations';

@observer
class Game extends React.Component {
  render() {
    return (
      <section className="navigator-panel">
        <ol className="navigator-panel__locations-list">
          {locations.map((location, index) => (
            <li
              className="navigator-panel__location"
              key={index}
            >
              {location.name}
            </li>
          ))}
        </ol>
      </section>
    );
  }
}

export default Game;
