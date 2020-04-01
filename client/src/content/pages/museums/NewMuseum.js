import React, { useState } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useAddMuseum } from "../../../CustomHooks.js";

export default function NewMuseum(props) {
  // TODO: Make a form that sends new museum form to SERVER_URL/museums/new
  const sendToDB = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/museums`, inputs)
      .then(response => {
        if (response.data.message) {
          setError(response.data.message);
        } else {
          setNewMuseum(response.data);
        }
      }).catch(err => {
        setError(err);
      });
  }

  const { inputs, handleInputChange, handleSubmit } = useAddMuseum(sendToDB);
  const [newMuseum, setNewMuseum] = useState(null);
  const [err, setError] = useState(null);

  if (newMuseum) {
    return <Redirect to={`/museums/${newMuseum._id}`} />
  }
  // TODO: go to museum show page

  return (
    <div>
      <h1>NEW MUSEUM STUB</h1>
      <form>
        <label htmlFor="name">Museum Name</label>
        <input type="text" name="name" onChange={handleInputChange} value={inputs.name} required />
        <button type="submit" onSubmit={handleSubmit}>Add Museum</button>
      </form>
    </div>
  )
}