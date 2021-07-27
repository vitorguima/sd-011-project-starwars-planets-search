import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContex';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');

  function handleClick() {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  }

  useEffect(() => {
    const getAPI = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((api) => api.json());
      results.filter((item) => delete item.residents);
      setData(results);
    };
    getAPI();
  }, []);

  const handleChange = ({ target }) => {
    switch (value) {
    case 'name':
      setFilters({ filterByName: { name: target.name } });
      break;
    case 'value':
      setFilters({ filterByNumericValues: { value: target.value } });
      break;
    case 'column':
      setFilters({ filterByNumericValues: { column: target.column } });
      break;
    case 'comparison':
      setFilters({ filterByNumericValues: { comparison: target.comparison } });
      break;
    default:
      setFilters({ ...filters, filterByName: { name: target.value } });
    }
  };

  const context = {
    data,
    filters,
    handleChange,
    handleClick,
    setColumn,
    setComparison,
    setValue,
  };

  return (
    <PlanetContext.Provider value={ context }>
      { children }
    </PlanetContext.Provider>
  );
}



PlanetsProvider.propTypes = ({
  children: PropTypes.node,
}).isRequired;

export default PlanetsProvider;
