import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import StarContext from './StarContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  const fetchAPI = async () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json')
      .then((response) => response.json())
      .then((resp) => setData(resp.results));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (

    <div>
      <StarContext.Provider
        value={ {
          data,
          setData,
          filters,
          setFilters,
        } }
      >
        {children}
      </StarContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
