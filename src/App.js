import React, { useState, useEffect } from 'react';
import './App.css';
// import Table from './components/Table';
// import MyContext from './context/MyContext';

function App() {
  const [planets, setPlanets] = useState([]);

  // didMount
  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint)
        .then((data) => data.json());
      setPlanets(results);
    };
    getPlanets();
  }, []);
  return (
    <div>
      <ul>
        {
          planets.map(({ name }) => <li key={ name }>{ name }</li>)
        }
      </ul>
    </div>
  );
}

export default App;

// apenas um comentário
