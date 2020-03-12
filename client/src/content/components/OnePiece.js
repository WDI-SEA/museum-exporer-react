import React from 'react';

export default function OnePiece(props) {
  const piece = props.piece;

  return (
    <div>
      <h3>{piece.name}</h3>
      <h4>by {piece.creator.name} ({piece.creator.birthyear ? piece.creator.birthyear : 'unknown'} — {piece.creator.deathyear ? piece.creator.deathyear : 'unknown'})</h4>
      <hr />
      <img src={piece.image} alt={`${piece.name} by ${piece.creator}`} />
    </div>
  )
}