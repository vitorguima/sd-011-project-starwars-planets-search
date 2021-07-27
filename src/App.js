import React, { useEffect, useState } from 'react';
import './App.css';
import MyContext from './components/MyContext';
import Table from './components/Table';
import getPlanets from './data';

function App() {
  const [planets, setPlanets] = useState();
  const [search, setSearch] = useState();
  const [planetList, setList] = useState();
  useEffect(() => {
    const getPlanetsList = async () => {
      const planetsList = await getPlanets();
      const list = planetsList.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setList(list);
      setPlanets(list);
    };
    getPlanetsList();
  }, []);

  useEffect(() => {
    if (planets) {
      const list = planets.filter((planet) => (
        planet.name.toLowerCase().includes(search.toLowerCase())
      ));
      setList(list);
    }
  }, [search, planets]);

  const contextValue = {
    planets: planetList,
    filters: {
      filterByName: {
        name: search,
      },
    },
  };

  return (
    <MyContext.Provider value={ contextValue }>
      <input
        data-testid="name-filter"
        type="text"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <Table />
    </MyContext.Provider>
  );
}

export default App;
