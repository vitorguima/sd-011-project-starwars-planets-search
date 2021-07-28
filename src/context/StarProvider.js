import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import fetchPlanetsOnAPI from '../services/StarWarsPlanetAPI';

function StarProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });
  const [otherFilters, setOtherFilters] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: '',
    }
  );
console.log(otherFilters);

  function filtersByNumbers({ target } ) {
    const { name, value } = target;
    setOtherFilters({ ...otherFilters, [name]: value });
    console.log(target);
  }

  function filterInput({ target }) {
    const { value } = target;
    setFilters({ ...filters,
      filterByName: {
        name: value,
      },
    });
  }

  useEffect(() => {
    async function fetchPlanets() {
      setLoading(true);
      const data = await fetchPlanetsOnAPI();
      setPlanets(data);
      setLoading(false);
    }
    fetchPlanets();
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    if (name) {
      setFilterPlanet(planets.filter(
        (planet) => planet.name.toLowerCase().includes(name.toLowerCase()),
      ));
    } else {
      setFilterPlanet(planets);
    }
  }, [filters, planets, filters.filterByName.name]);

  return (
    <StarContext.Provider value={ { planets, loading, filterInput, filterPlanet, filtersByNumbers } }>
      { children }
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
