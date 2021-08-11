import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [value] = useState(0);
  const [filterPlanets, setFilterPlanets] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const [column, setColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [comparison] = ([
    'maior que',
    'menor que',
    'igual a',
  ]);

  useEffect(() => {
    const getPlanets = async () => {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endPoint)
        .then((planets) => planets.json())
        .then((planet) => planet);
      setData(results);
    };
    getPlanets();
  }, []);

  const filterPlanetValues = async () => {
    const { filterByNumericValues: number } = filterPlanets;
    const updateFilter = {
      column,
      value,
      comparison,
    };
    await setFilterPlanets({
      ...filterPlanets, filterByNumericValues: [...number, updateFilter],
    });
    const selectColumn = document.querySelector('#column').value;
    setColumn(selectColumn);
  };

  const myDataPlanets = {
    data,
    setData,
    filterPlanets,
    setFilterPlanets,
    column,
    setColumn,
    value,
    comparison,
    filterPlanetValues,
  };

  return (
    <Context.Provider value={ myDataPlanets }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = ({
  children: PropTypes.func,
}).isRequired;

export default Provider;
