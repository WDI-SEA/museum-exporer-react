import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorMsg from '../../components/ErrorMsg';

export default function ShowMuseum(props) {
  // Get PARAMS from the link
  const {id} = useParams()
  // use currentMuseum state
  const [museum, setMuseum] = useState({});
  const [pieces, setPieces] = useState([]);
  const [error, setError] = useState(null);
  const [showPieces, setShowPieces] = useState(false);
  // call to SERVER_URL/museums/{id} and set result to state
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/museums/${id}`)
    .then(response=>{
      if (!response.ok) {
        console.log('something went wrong!')
        return
      }
      return response.json()
    }).then(dbMuseum => {
      setMuseum(dbMuseum);
    }).catch(err=>console.log(err));
  }, [])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/pieces?museum=${museum._id}`)
    .then(response => response.data.message ? setError(response.data.museum) : setPieces(response.data))
    .catch(err=>setError(err))
  }, [museum]);

  const toggleShowPieces = e => setShowPieces(!showPieces);

  if (error) return <ErrorMsg err={error} />

  let museumDeets = !museum ? <h3>'Loading'</h3> : (
    <div>
      <h2>{museum.name}</h2>
      <h5>{museum.city}, {museum.country}</h5>
      <img src={museum.image} />
    </div>
  )

  let allPieces = pieces.length < 1 ? "" : pieces.map((piece, i) => (
    <Link to={`/pieces/${piece._id}`} key={`piece-${i}`}>
      <h3>{piece.name} <span>by {piece.creator.name}</span></h3>
    </Link>
  ))

  return (
    <div>
      {museumDeets}
      <button className='button-link' onClick={toggleShowPieces}>{showPieces ? 'Hide' : 'Show'} all Pieces for {museum.name}</button>
      <hr />
      <div className={showPieces ? '' : 'hidden'}>
        {allPieces}
      </div>
    </div>
  )
}