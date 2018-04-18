import React from 'react';
import Cell from './Cell';

const Row = (props) => {
  return (
    <tr>
      {
        props.row.map((cell, index) => <Cell key={index} cell={cell} player={props.player} />)
      }
    </tr>
  );
};

export default Row;
