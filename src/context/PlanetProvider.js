import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparision: '',
        value: '',
      },
    ],
  });
  const [searchByName, setSearchByName] = useState(false);
  const [searchByNumeric, setSearchByNumeric] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const context = {
    filteredPlanets,
    setFilters,
    setSearchByName,
    setSearchByNumeric,
  };

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const resInJSON = await response.json();
      setData(resInJSON.results);
    }
    fetchPlanets();
  }, []);
  //-------------------------------------------------------------------

  useEffect(() => {
    let planetsFiltered = [];

    if (searchByName) {
      const { filterByName: { name } } = filters;
      planetsFiltered = data.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())
      ));
      setFilteredPlanets(planetsFiltered);
    } else if (searchByNumeric) {
      const { filterByNumericValues: [{ column, comparision, value }] } = filters;

      if (comparision === 'maior que') {
        planetsFiltered = data.filter(
          (planet) => parseInt(planet[column], 10) > parseInt(value, 10),
        );
        setFilteredPlanets(planetsFiltered);
      } else if (comparision === 'menor que') {
        planetsFiltered = data.filter(
          (planet) => parseInt(planet[column], 10) < parseInt(value, 10),
        );
        setFilteredPlanets(planetsFiltered);
      } else {
        planetsFiltered = data.filter(
          (planet) => parseInt(planet[column], 10) === parseInt(value, 10),
        );
        setFilteredPlanets(planetsFiltered);
      }
    } else {
      setFilteredPlanets(data);
    }
  }, [filters, data, searchByNumeric, searchByName]);

  //---------------------------------------------------------------------

  return (
    <PlanetContext.Provider value={ context }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PlanetProvider;
