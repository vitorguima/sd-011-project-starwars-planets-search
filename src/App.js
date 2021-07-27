import React, { useEffect, useState } from 'react';
import './App.css';
import MyContext from './components/MyContext';
import Table from './components/Table';
import getPlanets from './data';

function App() {
  const [planets, setPlanets] = useState();
  useEffect(() => {
    const getPlanetsList = async () => {
      const planetsList = await getPlanets();
      const list = planetsList.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(list);
    };
    getPlanetsList();
  }, []);

  return (
    <MyContext.Provider value={ planets }>
      <Table />
    </MyContext.Provider>
  );
}

export default App;
