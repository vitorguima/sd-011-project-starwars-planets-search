import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setPlanets] = useState([]);
  const [search, setSearch] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');

  const filterClick = () => {
    setSearch({
      ...search,
      filterByNumericValues: [
        ...search.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  };

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((payload) => payload.json());
      results.forEach((item) => {
        delete item.residents;
      });
      setPlanets(results);
    };

    getPlanets();
  }, []);

  const filter = ({ target }) => {
    if (value === 'name') {
      setSearch({
        filterByName: {
          name: target.name },
      });
    } else if (value === 'value') {
      setSearch({
        filterByNumericValues: {
          value: target.value },
      });
    } else if (value === 'column') {
      setSearch({
        filterByNumericValues: {
          column: target.column },
      });
    } else if (value === 'comparison') {
      setSearch({
        filterByNumericValues: {
          comparison: target.comparison },
      });
    } else {
      setSearch({ ...search,
        filterByName:
        { name: target.value },
      });
    }
  };

  return (
    <PlanetsContext.Provider
      value={ { data,
        search,
        setSearch,
        setValue,
        filter,
        filterClick,
        setColumn,
        setComparison,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default PlanetsProvider;
