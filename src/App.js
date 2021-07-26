import React, { useEffect, useState } from 'react';
import './App.css';
import MyContext from './MyContext';
import Table from './Table';

function App() {
  const [initstate, setInitState] = useState([]);

  async function getApi() {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json();
    setInitState(results);
  }

  useEffect(() => {
    getApi();
  }, []);

  return (
    <MyContext.Provider value={ initstate }>
      <Table />
    </MyContext.Provider>

  );
}

export default App;
