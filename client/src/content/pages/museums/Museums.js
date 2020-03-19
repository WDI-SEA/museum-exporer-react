import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Museum(props) {
  const [museums, setMuseums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/museums`)
      .then(response => {
        if (response.data.message) {
          setError(response.data.message);
          console.log(response.data.err);
        } else {
          setMuseums(response.data);
        }
      }).catch(err => {
        setError(err.message);
        console.log(err);
      });
  });

  const museumLinkList = museums.length < 1 ? 
    <h3>There are no museums left!</h3> : 
    museums.map((museum, index) => (
      <div key={index}>
        <h3>{museum.name}</h3>
        <h6><Link to={`/museums/${museum._id}`}>Link to Museum</Link></h6>
        <h6>{museum.city}, {museum.country}</h6>
      </div>
    ));

  return (
    <div>
      <h1>MUSEUMS STUB</h1>
      <Link to={`/museums/add`}>Add Museum</Link>
      {museumLinkList}
    </div>
  )
}