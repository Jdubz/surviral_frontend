import {
  React,
  observer,
} from 'globalImports';
import { itemStore } from "stores";
import Button from 'material-ui/Button';

import PlayerInventory from '../playerInfo/playerInventory';
import LocationInventory from '../locationPanel/locationInventory';

@observer
class InventoryPanel extends React.Component {
  render() {
    return (
      <div className={'inventory-container'}>
        <Button
          variant="raised"
          color="primary"
          className={'inventory-btn'}
          onClick={() => {
            console.log('open');
            itemStore.inventoryOpen = !itemStore.inventoryOpen;
          }}
        >Inventory</Button>
        {(() => {
          if (itemStore.inventoryOpen) {
            return (
              <div className={'inventory-panel'}>
                <PlayerInventory/>
                <LocationInventory/>
              </div>
            );
          }
          return null;
        })()}
      </div>
    );
  }
}

export default InventoryPanel;