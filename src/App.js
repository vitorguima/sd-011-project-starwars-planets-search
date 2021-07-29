import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import MyContext from './context/MyContext';

function App() {
  const [planets] = useState([]);

  //didMount
  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const results = await fetch(endpoint)
      .then((data) => data.json());
    };
    getPlanets();
  }, []);
  return ();
}

export default App;

// apenas um comentário
