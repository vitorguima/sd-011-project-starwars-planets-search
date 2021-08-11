import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetFiltered, setPlanetFiltered] = useState([]);
  const [dropFilter, setDropFilter] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const value = {
    planets,
    setPlanets,
    filter,
    setFilter,
    planetFiltered,
    setPlanetFiltered,
    dropFilter,
    setDropFilter,
  };

  useEffect(() => {
    const filterPlanet = () => {
      const planetFilter = planets.filter((planet) => (
        (planet.name).includes(filter.filterByName.name) === true));
      setPlanetFiltered(planetFilter);
    };
    filterPlanet();
  }, [filter, planets]);

  useEffect(() => {
    const dropsPlanets = () => {
      let array = planetFiltered;
      if (dropFilter.length > 0) {
        array = dropFilter;
      }
      const drops = array.filter((planet) => {
        // console.log(array);
        let planetColumn = '';
        let valueColumn = '';
        const resultsFilter = filter.filterByNumericValues.every((item) => {
          planetColumn = Number(planet[item.column]);
          valueColumn = Number(item.value);
          // console.log(item);
          if (item.comparison === 'maior que') {
            return (
              planetColumn > valueColumn
            );
          }
          if (item.comparison === 'menor que') {
            return (
              planetColumn < valueColumn
            );
          }
          return planetColumn === valueColumn;
        });
        // console.log(resultsFilter);
        return resultsFilter;
      });
      // console.log(drops);
      setDropFilter([...drops]);
    };
    if (filter.filterByNumericValues.length > 0) {
      dropsPlanets();
    }
  }, [filter, planetFiltered, setDropFilter]);

  // useEffect(() => {
  //   const dropFilterPlanet = () => {
  //     if (planets[0] !== undefined) {
  //       const planetDrop = Object.keys(planets[0]).filter((planet) => (
  //         (planet).includes(dropFilter) === true));
  //       setPlanetFiltered(planetDrop);
  //     }
  //   };
  //   dropFilterPlanet();
  // }, [dropFilter, planets]);

  useEffect(() => {
    fetchPlanets().then((data) => setPlanets(data));
  }, [setPlanets]);

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape(Object).isRequired,
};

export default Provider;
