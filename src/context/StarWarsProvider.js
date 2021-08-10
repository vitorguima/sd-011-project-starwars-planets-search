import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [columns, setColumns] = useState([
    'population ', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  useEffect(() => {
    fetchApi()
      .then((result) => setData(result));
  }, []);

  useEffect(() => {
    setDataTable(data);
  }, [data]);

  return (
    <StarWarsContext.Provider
      value={ {
        dataTable,
        columns,
        setColumns,
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
