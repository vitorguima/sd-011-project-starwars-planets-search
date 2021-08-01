import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApiPlanets from '../services/API';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterNumbers, setFilterNumbers] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [initialFilters, setInitialFilters] = useState(
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  );

  const { filterByNumericValues } = initialFilters;

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetchApiPlanets();
      setData(response);
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    let planetsFiltereds = data.filter((item) => item.name.toLowerCase()
      .includes(initialFilters.filterByName.name.toLowerCase()));
    if (filterByNumericValues.length > 0) {
      planetsFiltereds = planetsFiltereds.filter((planet) => {
        const { column, comparison, value } = filterNumbers;
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        }
        return Number(planet[column]) === Number(value);
      });
    }

    setFilteredPlanets(planetsFiltereds);
  }, [initialFilters, data, setFilteredPlanets, filterByNumericValues, filterNumbers]);

  const setNumericFilters = (newObj) => {
    setInitialFilters({ ...initialFilters,
      filterByNumericValues: [...initialFilters.filterByNumericValues, newObj] });
  };

  const context = {
    data,
    setFilteredPlanets,
    initialFilters,
    setInitialFilters,
    filteredPlanets,
    filterNumbers,
    setFilterNumbers,
    setNumericFilters,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = PropTypes.arrayOf(PropTypes.string).isRequired;

export default StarWarsProvider;
