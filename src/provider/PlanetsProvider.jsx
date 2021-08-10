import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApiStarWarsPlanets from '../services/FetchApiStarWarsPlanets';
import PlanetsContext from '../context/PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [selectFilter, setSelectFilter] = useState(
    {
      filters: {
        filterByName: {
          name: '',
        },
      },
    },
  );

  async function getFetchApiStarWarsPlanets() {
    const planets = await fetchApiStarWarsPlanets();
    setData(data.concat(planets));
  }

  useEffect(() => {
    getFetchApiStarWarsPlanets();
  }, []);

  const handleFilterName = ({ target }) => {
    setSelectFilter({
      filters: {
        ...selectFilter.filters,
        filterByName: { name: target.value },
      },
    });
  };

  return (
    <PlanetsContext.Provider
      value={ {
        data,
        selectFilter,
        handleFilterName,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
