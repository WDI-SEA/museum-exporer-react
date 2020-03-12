import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAddMuseum } from '../../../CustomHooks';
import axios from 'axios';

export default function NewMuseum(props) {
  const sendToDb = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/museums`, inputs)
    .then(response=>{
      if (response.data.message) {
        setError(response.data.message)
      } else {
        setNewMuseum(response.data)
      }
    }).catch(err=>console.log(err));
  }

  const {inputs, handleInputChange, handleSubmit} = useAddMuseum(sendToDb);
  const [newMuseum, setNewMuseum] = useState(null)
  const [error, setError] = useState(null)
  
  if (newMuseum) return <Redirect to={`/museums/${newMuseum._id}`} />

  return (
    <div>
      <h1>Add a New Museum</h1>
      <form onSubmit={handleSubmit}>
        <label>Museum Name</label>
        <input type="text" name="name" onChange={handleInputChange} value={inputs.name} required />

        <label>Country</label>
        <input type="text" name="country" onChange={handleInputChange} value={inputs.country} />

        <label>City</label>
        <input type="text" name="city" onChange={handleInputChange} value={inputs.city} />

        <label>Image Url</label>
        <input type="text" name="image" onChange={handleInputChange} value={inputs.image} />

        <button type="submit">Add Museum</button>
      </form>
    </div>
  )
}