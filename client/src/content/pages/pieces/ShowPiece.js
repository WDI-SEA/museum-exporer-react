import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import OnePiece from '../../components/OnePiece';
import ErrorMsg from '../../components/ErrorMsg';

export default function ShowPiece(props) {
  // Get PARAMS from the link
  let {id} = useParams()
  // use currentPiece state
  const [currentPiece, setCurrenPiece] = useState({});
  const [error, setError] = useState(null);
  // call to SERVER_URL/pieces/{id} and set result to state
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/pieces/${id}`)
    .then(piece=>setCurrenPiece(piece.data))
    .catch(err=>setError(err));
  }, [])

  if (error) return <ErrorMsg err={error} />

  let display = !currentPiece.name ? <h4>Loading...</h4> : (
    <>
      <h1>SHOWPIECE STUB</h1>
      <OnePiece piece={currentPiece} />
      <p>Currently at <Link to={`/museums/${currentPiece.museum._id}`} >{currentPiece.museum.name}</Link></p>
    </>
  )

  return (
    <div>
      {display}
    </div>
  )
}