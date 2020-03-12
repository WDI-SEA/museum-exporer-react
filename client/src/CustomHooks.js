import React, { useState } from 'react';

const useAddMuseum = (callback) => {
  const [inputs, setInputs] = useState({
    name: '',
    country: '',
    city: '',
    image: ''
  });

  const handleInputChange = e => {
    e.persist();
    setInputs({...inputs, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    console.log('🍑')
    console.log(inputs)
    if (e) {
      e.preventDefault();
    }
    callback();
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs
  }
}

export {
  useAddMuseum
}