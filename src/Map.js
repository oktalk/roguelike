import React from 'react';
import Row from './Row';

const Map = (props) => {
  return (
    <div className="m-auto">
      <table id="gameMap" className="dungeon mb-1">
        <tbody>
          {
            props.mapData.map((row, index) => <Row key={index} row={row} player={props.player} />)
          }
        </tbody>
      </table>
    </div>
  );
}

export default Map;
