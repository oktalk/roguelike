import React from 'react';

const Cell = props => {
  // MAGIC!!! tell the @ symbol that this is her location
  const isPlayer   = (props.player !== null) && (props.cell.i === props.player.x) && (props.cell.j === props.player.y);
  const uTopKind   = isPlayer? 'player' : props.cell.topKind;
  const uTopSymbol = isPlayer? '@'      : props.cell.topSymbol;
  const tClass     = (uTopKind? (uTopKind + ' ') : '') + props.cell.tileKind;
  const tConts     = (uTopSymbol? uTopSymbol : props.cell.tileSymbol);

  return (
    <td className={tClass}>{tConts}</td>
  );
};

export default Cell;
