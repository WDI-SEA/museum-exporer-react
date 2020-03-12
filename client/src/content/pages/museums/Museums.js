import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Museum(props) {
  // Make 'museums' state
  const [museums, setMuseums] = useState([]);
  // Call to API to get all museums
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/museums`)
    .then(response=>{
      if (!response.ok) {
        console.log('something went wrong!')
        return
      }
      return response.json()
    }).then(dbMuseums => {
      setMuseums(dbMuseums);
    }).catch(err=>console.log(err));
  }, [])

  let museumDeets = museums.length < 1 ? <h3>No museums yet!</h3> : museums.map((museum, i)=>{
    return (
      <div key={`museum-${i}`}>
        <h4><Link to={`/museums/${museum._id}`}>{museum.name}</Link></h4>
        <h5>{museum.city}, {museum.country}</h5>
      </div>
    )
  })

  return (
    <div>
      <h1>All Museums</h1>
      <div className="button-link"><Link to='/museums/add'>Add A Museum</Link></div>
      {museumDeets}
    </div>
  )
}