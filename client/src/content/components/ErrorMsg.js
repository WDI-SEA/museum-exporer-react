import React from 'react';

export default function ErrorMsg(props) {
  return (
    <div>
      <h1>{props.err.toUpperCase()}</h1>
    </div>
  )
}