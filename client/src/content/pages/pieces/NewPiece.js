import React, { useState, useEffect } from 'react';
import { useAddPiece } from '../../../CustomHooks';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ErrorMsg from '../../components/ErrorMsg';

export default function NewPiece(props) {
  const sendToDb = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/pieces`, inputs)
    .then(response=>{
      if (response.data.message) {
        setError(response.data.message)
      } else {
        setNewPiece(response.data)
      }
    })
    .catch(err=>setError(err));
  }
  
  const [error, setError] = useState(null);
  const [newPiece, setNewPiece] = useState(null);
  const [museums, setMuseums] = useState([]);
  const {inputs, handleInputChange, handleSubmit, setOneInput} = useAddPiece(sendToDb)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/museums`)
    .then(response=>{
      if (response.data.message) {
        setError(response.data.message)
      } else {
        setMuseums(response.data)
      }
    })
    .catch(err=>setError(err));
  }, [])

  // TODO: Make a form that sends new piece form to SERVER_URL/pieces/new
  // Go to Piece show page
  if (newPiece) return <Redirect to={`/pieces/${newPiece._id}`} />
  if (error) return <ErrorMsg err={error} />

  let options = museums.length < 1 ? '' : museums.map(museum => <option value={museum._id}>{museum.name}</option>)

  return (
    <div>
      <h1>Add a piece</h1>
      <form onSubmit={handleSubmit}>
        <label>Piece Name</label>
        <input type="text" name="pName" onChange={handleInputChange} value={inputs.pName} required />
        
        <label>Image Url</label>
        <input type="text" name="pImage" onChange={handleInputChange} value={inputs.pImage} />

        <label>Museum</label>
        <select 
          name="museum"
          value={inputs.museum} 
          onChange={handleInputChange}>
          {options}
        </select>

        <hr />

        <h5>Creator Info</h5>
        <label>Name</label>
        <input type="text" name="cName" onChange={handleInputChange} value={inputs.cName} />
        
        <label>Year of Birth</label>
        <input type="text" name="birthyear" onChange={handleInputChange} value={inputs.birthyear} />
        
        <label>Year of Death</label>
        <input type="text" name="deathyear" onChange={handleInputChange} value={inputs.deathyear} />
        
        <label>Creator Portrait Url</label>
        <input type="text" name="cImage" onChange={handleInputChange} value={inputs.cImage} />
        
        <button type="submit">Add Piece</button>
      </form>
    </div>
  )
}