import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    fetchApi()
      .then((result) => setData(result));
  }, []);

  useEffect(() => {
    setDataTable(data);
  }, [data]);

  useEffect(() => {
    const { filterByName } = filters;
    const filteredResult = data.filter(
      (planet) => planet.name.includes(filterByName.name),
    );
    setDataTable(filteredResult);
  }, [filters]);
  return (
    <StarWarsContext.Provider
      value={ {
        dataTable,
        filters,
        setFilters,
      } }
    >
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
