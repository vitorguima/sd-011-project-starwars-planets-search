import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [name, setNameFilter] = useState('');
  const [filterColumn, setFilterColumn] = useState({
    column: '',
    comparison: '',
    value: '',
  });
  const [addFilter, setAddFilter] = useState(false);

  const handleFilter = (target) => {
    setFilterColumn({
      ...filterColumn,
      [target.name]: target.value,
    });
  };

  const URL_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    fetch(URL_API)
      .then((response) => {
        response.json()
          .then(({ results }) => setData(results));
      });
  }, []);
  // array de dependencias para o componente nao renderizar mais de uma vez, sem ele o componente é diparado toda vez que renderiza

  const filteredData = () => {
    const { column, comparison, value } = filterColumn;
    const newData = data.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return parseInt(planet[column], 10) > parseInt(value, 10);
      case 'menor que':
        return parseInt(planet[column], 10) < parseInt(value, 10);
      default:
        return parseInt(planet[column], 10) === parseInt(value, 10);
      }
    });
    return newData;
  };

  useEffect(() => {
    const filter = () => {
      if (addFilter) {
        const newData = filteredData();
        setFilterData(newData);
        setAddFilter(false);
      }
    };
    // console.log('oi');
    filter();
  });

  const contextValue = {
    data,
    filterData,
    filters: {
      filterByName: {
        name,
      },
      filterColumn: [{ ...filterColumn }],
    },
    setNameFilter,
    handleFilter,
    addFilter,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}
// descreve qualquer coisa que pode ser renderizada - strings, números, elementos ou um array
MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyProvider;
