import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAddMuseum } from '../../../CustomHooks';
import axios from 'axios';

export default function NewMuseum(props) {
  const sendToDb = (e) => {
    console.log('🍕');
    console.log(inputs);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/museums`,
      data: {
        city: "please",
        county: "fucking",
        name: 'Work',
        image: 'farts'
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response=>{
      console.log('🍟')
      console.log(response)
      setNewMuseum(response.data)
    }).catch(err=>console.log(err));
  }

  const {inputs, handleInputChange, handleSubmit} = useAddMuseum(sendToDb);
  const [newMuseum, setNewMuseum] = useState(null)
  
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