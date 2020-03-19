import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ShowMuseum(props) {
  // TODO: Get PARAMS from the link
  const { dbid } = useParams();
  // TODO: use currentMuseum state
  const [museum, setMuseum] = useState({});
  const [error, setError] = useState(null);
  // TODO: call to SERVER_URL/museums/{id} and set result to state
  useEffect(() => {
    console.log(dbid, process.env.REACT_APP_SERVER_URL);
    axios.get(`${process.env.REACT_APP_SERVER_URL}/museums/${dbid}`)
      .then(response => { 
        if (response.data.message) {
          setError(response.data.message);
          console.log(response.data.err);
        } else {
          setMuseum(response.data);
        }
      }).catch(err => {
        setError(err);
      });
  }, []);

  useEffect(() => {
    console.log("request to api");
  }, [museum]);

  let museumDeets = !museum ? <h3>Loading...</h3> :
  <div>
    <h1>{museum.name}</h1>
    <img src={museum.image} alt={`${museum.name}`} />
    <h6>Located in {museum.city}, {museum.country}</h6>
  </div>

  return (
    <div>
      {museumDeets}
    </div>
  )
}