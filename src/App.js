import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState(0);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setPlanets(results);
      setFilteredPlanets(results);
      setLoading(false);
    };

    getPlanets();
  }, []);

  useEffect(() => {
    let newList = planets.filter((e) => e.name.includes(filters.filterByName.name));
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach(({ comparison: cm, column: c, value: v }) => {
        switch (cm) {
        case 'maior que':
          newList = planets.filter((planet) => Number(planet[c]) > Number(v));
          break;
        case 'menor que':
          newList = planets.filter((planet) => Number(planet[c]) < Number(v));
          break;
        case 'igual a':
          newList = planets.filter((planet) => Number(planet[c]) === Number(v));
          break;
        default:
          console.log('choose a proper comparison');
        }
      });
    }
    setFilteredPlanets(newList);
  }, [filters]);

  const addFilter = () => {
    const newFilter = { column, comparison, value };
    setFilters({
      ...filters, filterByNumericValues: [...filters.filterByNumericValues, newFilter] });
  };

  const data = {
    planets,
    filteredPlanets,
    loading,
    filters,
    setFilters,
    setColumn,
    setComparison,
    setValue,
  };

  return (
    <PlanetsContext.Provider value={ data }>
      <Table addFilter={ addFilter } />
    </PlanetsContext.Provider>
  );
}

export default App;
