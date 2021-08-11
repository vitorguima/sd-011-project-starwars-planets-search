import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import StarContext from './StarContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByValue, setFilterByValue] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json')
        .then((response) => response.json())
        .then((resp) => setData(resp.results));
    };
    fetchAPI();
  });

  useEffect(() => {}, [filterByValue]);

  const filters = {
    filterByName: {
      name: filterByName,
    },
    filterByValue,
  };

  const context = { data, setFilterByName, setFilterByValue, filters };

  return (

    <div>
      <StarContext.Provider value={ context }>
        {children}
      </StarContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
