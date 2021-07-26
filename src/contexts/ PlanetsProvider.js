import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filtered, setFiltered] = useState(data);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const [filters, setFilters] = useState({
    filterByName: {
      name,
    },
    filterByNumericValues: [
      {
        column,
        comparison,
        value,
      },
    ],
  });

  // Fazer tratativa de erro. Passar tbm para then e cath para testar sintaxe
  const fetchApi = async () => {
    const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const planets = await fetch(URL);
    const response = planets.json();
    return response;
  };

  useEffect(() => {
    const getPlanet = async () => {
      const { results } = await fetchApi();
      setData(results);
      setFiltered(results);
    };
    getPlanet();
  }, []);

  const context = {
    data,
    column,
    comparison,
    value,
    filtered,
    filters,
    setData,
    setName,
    setColumn,
    setComparison,
    setValue,
    setFiltered,
    setFilters,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;

// a resposta tem q ser filtrada de acordo com o input. Ou seja, array.includes(inputText) no campo filtrados
