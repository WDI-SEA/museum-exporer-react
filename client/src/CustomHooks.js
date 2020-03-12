import { useState } from 'react';

const useAddPiece = (formSubmit) => {
  const [inputs, setInputs] = useState({
    pName: '',
    pImage: '',
    museum: '',
    cName: '',
    cImage: '',
    birthyear: '',
    deathyear: ''
  });

  const handleInputChange = e => {
    e.persist();
    setInputs({...inputs, [e.target.name]: e.target.value });
  }

  const setOneInput = (key, value) => {
    setInputs({...inputs, [key]: value});
  }

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    formSubmit();
  }

  return {
    handleSubmit,
    handleInputChange,
    setOneInput,
    inputs
  }
}

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
  useAddMuseum,
  useAddPiece
}