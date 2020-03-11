import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ShowMuseum(props) {
  // Get PARAMS from the link
  let {id} = useParams()
  // use currentMuseum state
  const [museum, setMuseum] = useState({});
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

  let museumDeets = !museum ? 'Loading' : (
    <div>
      <h4>{museum.name}</h4>
      <h5>{museum.city}, {museum.country}</h5>
      <img src={museum.image} />
    </div>
  )

  return (
    <div>
      <h1>SHOW MUSEUM STUB</h1>
      {museumDeets}
    </div>
  )
}