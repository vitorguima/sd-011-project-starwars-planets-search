import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanetsApi from '../services/StarWarsPlanetApi';

function StarWarsProvider(props) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
  });

  useEffect(() => {
    const getData = async () => {
      const Data = await fetchPlanetsApi();
      return setData(Data);
    };
    getData();
  }, [filters.filterByName.name]);

  const { children } = props;
  return (
    <StarWarsContext.Provider value={ { setFilters, data, filters } }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.shape(Object),
};

StarWarsProvider.defaultProps = {
  children: PropTypes.shape(Object),
};
