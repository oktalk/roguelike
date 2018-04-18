import React, { Component } from 'react';
import Map from './Map';
import './App.css';

import './Dungeon/style.css'

/*
// To-do:
    • Procedurally draw new maps
//
*/

class App extends Component {
  state = {
    player: null,
    playerStats: {
      wounds: 10,
      treasure: 0
    },
    mapData: null,
    str_map:    '##+##################' +
              '\n#@....########..~~.##' +
              '\n#...R.##...###...≈.##' +
              '\n#.$...##.p.###...%.##' +
              '\n###+####...###...:.##' +
              '\n###....=..p.....¶..##' +
              '\n########...###.$$$.##' +
              '\n#####################'
  }

  makePlayer(opts) {
    return {
      x: opts.x || 0,
      y: opts.y || 0
    };
  }

  cell(input, i,j) {
    const { player } = this.state;
    let cell;
    switch(input) {
      case '.' :
        cell = {tileKind: 'floor', tileSymbol: input, i: i, j: j}
        break;
      case '#' :
        cell = {tileKind: 'rock', tileSymbol: input, i: i, j: j}
        break;
      case '~' :
        cell = {tileKind: 'water', tileSymbol: input, i: i, j: j}
        break;
      case '≈' :
        cell = {tileKind: 'lava', tileSymbol: input, i: i, j: j}
        break;
      case '%' :
        cell = {tileKind: 'vein', tileSymbol: input, i: i, j: j}
        break;
      case ':' :
        cell = {tileKind: 'rubble', tileSymbol: input, i: i, j: j}
        break;
      case 'c' :
        cell = {tileKind: 'floor', topKind: 'cat', topSymbol: 'c', tileSymbol: input, i: i, j: j}
        break;
      case 'd' :
        cell = {tileKind: 'floor', topKind: 'dog', topSymbol: 'd', tileSymbol: input, i: i, j: j}
        break;
      case 'D' :
        cell = {tileKind: 'floor', topKind: 'dragon', topSymbol: 'D', tileSymbol: input, i: i, j: j}
        break;
      case 'p' :
        cell = {tileKind: 'floor', topKind: 'person', topSymbol: 'p', tileSymbol: input, i: i, j: j}
        break;
      case 'R' :
        cell = {tileKind: 'floor', topKind: 'reptile', topSymbol: 'R', tileSymbol: input, i: i, j: j}
        break;
      case 't' :
        cell = {tileKind: 'floor', topKind: 'troll', topSymbol: 't', tileSymbol: input, i: i, j: j}
        break;
      case 'w' :
        cell = {tileKind: 'floor', topKind: 'worm', topSymbol: 'w', tileSymbol: input, i: i, j: j}
        break;
      case '$' :
        cell = {tileKind: 'floor', topKind: 'treasure', topSymbol: '$', tileSymbol: input, i: i, j: j}
        break;
      case '¶' :
        cell = {tileKind: 'floor', topKind: 'weapon', topSymbol: '¶', tileSymbol: input, i: i, j: j}
        break;
      case '+' :
        cell = {tileKind: 'floor', topKind: 'door', topSymbol: '+', tileSymbol: input, i: i, j: j}
        break;
      case '@':
        if (player) { break; }
        this.setState({
          player: this.makePlayer({ x: i, y: j })
        });
        cell = {chr: input, i: i, j: j}
        break;
      default:
        cell = {chr: input, i: i, j: j}
    }
    return cell;
  }

  mapStringToGameMap = mapString => {
    return (
      mapString.split('\n').map((row,j) => {
        return (
          row.split('').map((chr,i) => {
            return this.cell(chr,i,j)
          })
        );
      })
    );
  };

  action = (dir) => {
    this.setState((prevState) => {
      const y = prevState.player.y + dir.y;
      const x = prevState.player.x + dir.x;
      const { tileKind, topKind } = prevState.mapData[y][x];
      let obstacleMsg;
      let take = '';
      let mapData = [...prevState.mapData];
      let playerStats = Object.assign({}, prevState.playerStats);
      let player = {
        y: y,
        x: x
      };
      if(['rock', 'water', 'lava', 'rubble'].includes(tileKind)) {
        obstacleMsg = `Seems you've run into ${tileKind}`;
        player = {
          y: prevState.player.y,
          x: prevState.player.x
        };
      } else if(['treasure', 'weapon'].includes(topKind)) {
        mapData[y][x].topKind = '';
        mapData[y][x].topSymbol = '.';
        obstacleMsg = `You've gained ${topKind}`;
        playerStats[topKind] = playerStats[topKind] + 1;
      }
      return {
        obstacleMsg,
        take,
        playerStats,
        player
      }
    });
  }

  onKeyDown = (e) => {
    let dir = {x: 0, y: 0};
    switch(e.keyCode) {
      case 40: dir.y = 1; break; // down
      case 39: dir.x = 1; break; // right
      case 37: dir.x = -1; break; // left
      case 38: dir.y = -1; break; // up
      default:
        return
    }
    this.action(dir);
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {this.onKeyDown(e)});
    this.setState({
      mapData: this.mapStringToGameMap(this.state.str_map)
    });
  }

  render() {
    const { playerStats, mapData, player, obstacleMsg, take } = this.state;
    return (
      <div className="App py-5">
        <div className="container">
          <div className="row">
            <div className="col-6 m-auto">
              <p>{!!playerStats.treasure && `${playerStats.treasure} Gold`}</p>
            </div>
          </div>
        </div>

        {mapData && <Map player={player} mapData={mapData} />}

        <div className="container">
          <div className="row">
            <div className="col-6 m-auto">
              <div className="alert alert-info">
                <strong>Info:</strong>
                <p>{obstacleMsg}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
