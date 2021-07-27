import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  const handleClick = () => {
    setSearchValue({
      ...searchValue,
      filterByNumericValues: [
        ...searchValue.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  };

  useEffect(() => {
    const getApi = async () => {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endPoint)
        .then((res) => res.json());
      results.filter((item) => item !== 'residents');
      setData(results);
    };
    getApi();
  }, []);

  const handleChange = ({ target }) => {
    switch (value) {
    case 'name':
      setSearchValue({ filterByName: { name: target.name } });
      break;
    case 'value':
      setSearchValue({ filterByNumericValues: { value: target.value } });
      break;
    case 'column':
      setSearchValue({ filterByNumericValues: { column: target.column } });
      break;
    case 'comparison':
      setSearchValue({ filterByNumericValues: { comparison: target.comparison } });
      break;
    default:
      setSearchValue({ ...searchValue, filterByName: { name: target.value } });
    }
  };

  const context = {
    data,
    searchValue,
    handleChange,
    handleClick,
    setColumn,
    setComparison,
    setValue,
  };

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
