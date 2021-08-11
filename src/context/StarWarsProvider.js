import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import { getThePlanets } from '../services';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filtered, setFiltered] = useState(data);
  const [filterNumeric, setFilterNumeric] = useState([]);
  const [filterSort, setFilterSort] = useState({ column: 'name', sort: 'ASC' });

  const get = () => {
    getThePlanets().then((response) => setData(response));
  };

  useEffect(get, []);

  const contextValue = {
    data,
    setData,
    setName,
    setFilterNumeric,
    setFilterSort,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: filterNumeric,
      order: filterSort,
    },
    filtered,
    setFiltered,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
