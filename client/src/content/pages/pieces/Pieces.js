import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Pieces(props) {
  // Make 'pieces' state
  const [pieces, setPieces] = useState([]);
  const [error, setError] = useState(null);
  // Call to API to get all pieces
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}/pieces`)
    .then(dbPieces => setPieces(dbPieces.data))
    .catch(err=>{
      console.log('💩')
      setError(err)
    })
  }, [])

  if (error) return <h1>{error}</h1>

  let displayPieces = pieces.length < 1 ? 'Loading...' : pieces.map(piece => (
    <div>
      <Link to={`/pieces/${piece._id}`}><h3>{piece.name}</h3></Link>
    </div>
  ))

  return (
    <div>
      <h1>All Art Pieces</h1>
      <div className="button-link"><Link to='/pieces/add'>Add a Piece</Link></div>
      {displayPieces}
    </div>
  )
}