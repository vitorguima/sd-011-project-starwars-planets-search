import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import fetchApi from '../components/useFetchApi';

function Provider({ children }) {
  const [data, setData] = useState('');
  const [search, setSearch] = useState('');
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
  const [random, setRandom] = useState({
    column: 'population', comparison: '', value: '' });
  const [columns, setColumn] = useState([]);
  const [filters, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });

  async function fetchUseEffect() {
    setData(await fetchApi());
  }

  useEffect(() => {
    fetchUseEffect();
  }, []);

  useEffect(() => {
    if (data) setPlanetsFiltered(data);
  }, [data, setPlanetsFiltered]);

  useEffect(() => {
    setColumn([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  }, [setColumn]);

  if (data.length === 0) return <p>Loading</p>;

  function toSearchInput({ target }) {
    setSearch({
      filters: {
        ...filters.filters,
        filterByName: { name: target.value } },
    });
    setPlanetsFiltered(data.filter((planet) => planet.name.includes(target.value)));
  }

  function randomState({ target }) {
    const { name, value } = target;
    setRandom({
      ...random,
      [name]: value,
    });
  }

  const getRandom = planetsFiltered.filter((value) => {
    const { filterByNumericValues } = filters.filters;

    if (filterByNumericValues.length > 0) {
      const randomValues = filterByNumericValues[filterByNumericValues.length - 1];
      switch (randomValues.comparison) {
      case 'maior que':
        return Number(value[randomValues.column]) > Number(randomValues.value);
      case 'menor que':
        return Number(value[randomValues.column]) < Number(randomValues.value);
      case 'igual a':
        return Number(value[randomValues.column]) === Number(randomValues.value);
      default: return true;
      }
    } return true;
  });

  function handleClickButton() {
    const { column, comparison, value } = random;
    setFilters({
      filters: {
        ...filters.filters.filterByName,
        filterByNumericValues: [...filters.filters.filterByNumericValues,
          { column, comparison, value }] },
    });
    setColumn(columns.filter((values) => values !== column));
  }

  const context = {
    search,
    columns,
    toSearchInput,
    randomState,
    getRandom,
    handleClickButton,
  };

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
