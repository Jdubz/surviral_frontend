import {
  React,
  observer,
} from 'globalImports';

import { playerStore } from '../../stores';

@observer
class PlayerInfo extends React.Component {
  render() {
    return (
      <div className="playerInfo-container">
        <p>{`Health: ${playerStore.health}`}</p>
        <p>{`Hunger: ${playerStore.hunger}`}</p>
        <div>
          <p>{`Food: ${playerStore.food}`}</p>
          <button
            onClick={() => {
              console.log('use food');
            }}
          >Eat Food</button>
        </div>
        <div>
          <p>{`Meds: ${playerStore.medicine}`}</p>
          <button
            onClick={() => {
              console.log('use meds');
            }}
          >Use Meds</button>
        </div>
      </div>
    )
  }
}