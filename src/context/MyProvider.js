import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endPoint).then((data1) => data1.json());
      results.filter((result) => result !== 'residents');
      setData(results);
    };
    getAPI();
  }, []);

  const handleChange = ({ target }) => {
    switch (value) {
    case 'name':
      setFilters({ filterByName: { name: target.name } });
      break;
    case 'column':
      setFilters({ filterByNumericValues: { column: target.column } });
      break;
    case 'comparison':
      setFilters({ filterByNumericValues: { comparison: target.comparison } });
      break;
    case 'value':
      setFilters({ filterByNumericValues: { value: target.value } });
      break;
    default:
      setFilters({ ...filters, filterByName: { name: target.value } });
    }
  };

  const handleClick = () => {
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
  };

  const contexts = {
    data,
    filters,
    handleChange,
    setColumn,
    setComparison,
    setValue,
    handleClick };
  return (
    <MyContext.Provider value={ contexts }>
      {children}
    </MyContext.Provider>
  );
}
export default MyProvider;

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
