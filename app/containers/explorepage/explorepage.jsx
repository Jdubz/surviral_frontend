import {
    React,
    observer
} from 'globalImports';


import ReactDOM from 'react-dom';
import TWEEN from '@tweenjs/tween.js';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Log from '../log/log';
import { locationStore } from '../../stores';
import drawBezierCurveThrough from '../../utils/drawBezierCurveThrough';
import findParentWithClass from '../../utils/findParentWithClass';
import distanceBetweenTwoPoints from '../../utils/distanceBetweenTwoPoints';
import angleBetweenTwoPoints from '../../utils/angleBetweenTwoPoints';

const types = {
  House: {
    width: 200,
    height: 200,
  },
  Forest: {
    width: 200,
    height: 300,
  },
}


const locations = [
  {
    id: 12345,
    name: 'A dwelling',
    type: 'House',
    mapX: 200,
    mapY: 200
  },
  {
    id: 1233,
    name: 'A forest',
    type: 'Forest',
    mapX: 400,
    mapY: 600
  }
];

@observer
class ExplorePage extends React.Component {
  constructor(props) {
    super(props);

    const activeLocation = locations.find((location) => location.id === locationStore.id);
    const type = types[activeLocation.type];
    const x = activeLocation.mapX + (type.width/2);
    const y = activeLocation.mapY + (type.height/2);

    this.state = {
      scrollX: 0,
      scrollY: 0,
      mapWidth: 5000,
      mapHeight: 5000,
      playerX: x,
      playerY: y,
      playerIsMoving: false,
      playerFacingAngle: 0,
      playerDimension: 80,
      playerAnimation: null,
    };
  }
  componentDidMount() {
    this.handlePlayerMovement();
    this.drawMapBackground();
  }
  componentWillUnMount() {
    // Clean up player animation managed by TWEEN
    if (this.state.playerAnimation) {
      this.state.playerAnimation.stop();
    }
  }
  render() {
    return (<div className="explorepage-container">
      <Paper className="explorepage-paper">
        <div className="explorepage-map-container">
          <div
            className="explorepage-map-inner-container"
            onClick={(e) => this.handlePlayerMovement(e)}>
            {locations.map((location, index) => {
              return (
                <div
                  key={index}
                  className="explorepage-map-svg-container">
                  {this[`render${location.type}`](location)}
                </div>
              );
            })}
            {this.state.playerIsMoving ? this.renderFeet() : null}
            <canvas
              className="explorepage-map"
              width={this.state.mapWidth}
              height={this.state.mapHeight}
            />
          </div>
        </div>
      </Paper>
    </div>);
  }
  handlePlayerMovement(event) {
    if (!event || this.state.playerIsMoving) {
      return;
    }

    const { clientX, clientY, target } = event;
    const container = findParentWithClass(target, 'explorepage-map-inner-container');

    if (container === null) {
      return;
    }

    const { top, left } = container.getBoundingClientRect();

    const desiredX = clientX - left;
    const desiredY = clientY - top;
    const { playerX, playerY } = this.state;
    const distance = distanceBetweenTwoPoints(desiredX, desiredY, playerX, playerY);
    function animate(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }
    requestAnimationFrame(animate);

    const coords = { x: playerX, y: playerY }; // Start at player location
    const tween = new TWEEN.Tween(coords)
      .to({ x: desiredX, y: desiredY }, 1000) // TODO: make this factor of speed over distance
      .onUpdate(() => {
        // TODO: make this handle stepping animation
        this.setState({
          playerX: coords.x,
          playerY: coords.y,
        });
      })
      .onStart(() => {
        this.setState({
          playerIsMoving: true,
          playerFacingAngle: angleBetweenTwoPoints(playerX, playerY, desiredX, desiredY),
        });
      })
      .onComplete(() => {
        this.setState({
          playerIsMoving: false,
          playerAnimation: null,
        });
      })
      .start();

    this.setState({
      playerAnimation: tween,
    });
  }
  drawMapBackground() {
    const canvas = ReactDOM.findDOMNode(this).querySelector('.explorepage-map');
    const context = canvas.getContext('2d');

    this.drawRoads(context);
    this.drawRivers(context);
  }
  drawRoads(context) {
    drawBezierCurveThrough(context, [
      // TODO: make road generation not hard-coded
      [0,0],
      [400,400],
      [500,600]
    ], 1, 8, "#606EBD");
  }
  drawRivers(context) {
    drawBezierCurveThrough(context, [
      // TODO: make river generation not hard-coded
      [200,0],
      [500,400],
      [300,600]
    ], 1, 3, "#609EBD");
  }
  renderFeet() {
    const {
      playerX,
      playerY,
      playerFacingAngle,
      playerDimension,
    } = this.state;

    const playerOffset = playerDimension / 2;

    const style = {
      transform: `translate(${playerX - playerOffset}px, ${playerY - playerOffset}px) rotate(${playerFacingAngle}deg)`,
      height: playerDimension,
      width: playerDimension,
    };

    return (
      <div className="explorepage-map-svg-container">
        <svg className="explorepage-map-feet" style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.65 16.21">
          <g id="_8kN6hb.tif" data-name="8kN6hb.tif"><path d="M15.41,7.32a10,10,0,0,1-3-.24.48.48,0,0,1-.38-.35c-.27-.86-.54-1.72-.81-2.58a.23.23,0,0,1,0-.18,2.66,2.66,0,0,1,1-.68,12.45,12.45,0,0,1,3.87-1.15,11.09,11.09,0,0,1,1.67,0,4.21,4.21,0,0,1,1.39.28,1.91,1.91,0,0,1,1.29,2A2.17,2.17,0,0,1,19.55,6a6.17,6.17,0,0,1-2.19,1A8.21,8.21,0,0,1,15.41,7.32Z"/><path d="M13.33,14.5a8.71,8.71,0,0,1-2.47-.15,11.41,11.41,0,0,1-2.08-.51,2.9,2.9,0,0,1-1.07-.58.24.24,0,0,1-.07-.19c.17-.9.35-1.81.52-2.71a.38.38,0,0,1,.26-.3,9.71,9.71,0,0,1,4.45-.57,6.76,6.76,0,0,1,2.56.7,2.37,2.37,0,0,1,1.23,1.23,1.91,1.91,0,0,1-.92,2.47,4.82,4.82,0,0,1-1.52.48Z"/><path d="M5.07,9.36a4.46,4.46,0,0,1,2.13.52l0,0c.33.18.33.17.24.52q-.31,1.21-.6,2.43c0,.11-.07.15-.2.15a6.26,6.26,0,0,1-1.9-.34,2.71,2.71,0,0,1-1.19-.79,1.43,1.43,0,0,1,.65-2.31,6.76,6.76,0,0,1,.84-.23Z"/><path d="M9.18,8.13a2.25,2.25,0,0,1-1.52-.38,1.37,1.37,0,0,1-.37-1.86,2.84,2.84,0,0,1,1.37-1.1,6.75,6.75,0,0,1,1.69-.45c.1,0,.11,0,.13.11l.61,1.65c.12.32.25.64.37,1a.14.14,0,0,1,0,.13A5,5,0,0,1,9.7,8C9.5,8.08,9.3,8.11,9.18,8.13Z"/></g>
        </svg>
      </div>
    );
  }
  renderHouse(location) {
    const style = {
      transform: `translate(${location.mapX}px, ${location.mapY}px)`,
      height: types[location.type].height,
      width: types[location.type].width,
    };

    const isActive = location.id === locationStore.id;

    return (
      <svg className={"explorepage-map-location" + (isActive ? ' is-active' : '')} style={style} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.14 57.74"><path d="M45.32,42.54,40.1,43.88V32.36l-6.69,2.69V45.23l-17.27,4V28.58s15-17.48,15.27-17.78c6,5.71,13.94,14.56,13.94,15C45.4,29,45.32,42.54,45.32,42.54ZM22.83,39.23l5.73-1.35V31l-5.73,1.35Z"/><path d="M30.2,10.15,15.07,26.61s-7.51-3.52-7.51-3.66,5.22-5.55,7.63-8.29c.25-.29.42-9.66.45-10.07h3.49v6.69l2.74-2.1Z"/><polygon points="13.27 49.27 5.76 40.24 5.76 24.43 13.27 28.13 13.27 49.27"/></svg>
    );
  }
  renderForest(location) {
    const style = {
      transform: `translate(${location.mapX}px, ${location.mapY}px)`,
      height: types[location.type].height,
      width: types[location.type].width,
    };

    const isActive = location.id === locationStore.id;

    return (
      <svg className={"explorepage-map-location" + (isActive ? ' is-active' : '')} style={style} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.32 77.86"><title>Map</title><polygon points="60.36 18.18 47.17 56.16 73.55 56.16 60.36 18.18"/><polygon points="47.17 28.67 38.94 52.38 55.4 52.38 47.17 28.67"/><polygon points="30.71 32.45 22.48 56.16 38.94 56.16 30.71 32.45"/><polygon points="19.4 30.13 14.52 44.21 24.29 44.21 19.4 30.13"/><polygon points="10.38 37.17 5.5 51.24 15.27 51.24 10.38 37.17"/><polygon points="116.06 33.94 111.17 48.01 120.94 48.01 116.06 33.94"/><polygon points="81.78 21.55 73.55 45.26 90.01 45.26 81.78 21.55"/><polygon points="101.04 14.47 90.9 53.4 111.17 53.4 101.04 14.47"/></svg>
    );
  }
}

export default ExplorePage;
