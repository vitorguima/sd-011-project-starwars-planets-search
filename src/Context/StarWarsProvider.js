import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [gotInfo, setGotInfo] = useState(false);
  const [filterByName, setName] = useState({ name: '' });
  const [filterByNumericValues, setNumericValues] = useState([
    {
      column: '',
      comparison: '',
      value: 0,
    },
  ]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(
        'https://swapi-trybe.herokuapp.com/api/planets/',
      ).then((planetsInfo) => planetsInfo.json());
      results.map((e) => delete e.residents); // Deleta os residents de cada um dos objetos, conforme pede no requisito.
      setData(results);
      setFilteredData(results);
      setGotInfo(true);
    };
    getPlanets();
  }, []);

  function updateFilteredDataWithFilters() {
    if (filterByNumericValues.comparison === 'maior que') {
      setFilteredData(
        filteredData.filter(
          (e) => e[filterByNumericValues.column] > filterByNumericValues.value,
        ),
      );
    }
    if (filterByNumericValues.comparison === 'menor que') {
      setFilteredData(
        filteredData.filter(
          (e) => e[filterByNumericValues.column] < filterByNumericValues.value,
        ),
      );
    }
    if (filterByNumericValues.comparison === 'igual a') {
      setFilteredData(
        filteredData.filter(
          (e) => parseFloat(e[filterByNumericValues.column])
            === filterByNumericValues.value,
        ),
      );
    }
  }

  function handleFilterByNumbers() {
    const column = document.getElementById('filterByCategory').value;
    const comparison = document.getElementById('comparisonField').value;
    const informedValue = document.getElementById('valueField').value;
    setNumericValues({
      column,
      comparison,
      value: parseFloat(informedValue),
    });
  }

  useEffect(() => {
    updateFilteredDataWithFilters();
  }, [filterByNumericValues]);

  const contextValue = {
    updateFilteredDataWithFilters,
    handleFilterByNumbers,
    filteredData,
    setFilteredData,
    setData,
    data,
    gotInfo,
    setName,
    setNumericValues,
    filters: {
      filterByName,
      filterByNumericValues,
    },
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
