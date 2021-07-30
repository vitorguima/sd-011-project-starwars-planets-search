import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [filters, setFilters] = useState(
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  );

  const { filterByName, filterByNumericValues } = filters;
  const { name } = filterByName;
  useEffect(() => {
    const endpointPlanets = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getPlanets = async () => {
      const results = await fetch(endpointPlanets);
      const dataPlanets = await results.json();
      setData(dataPlanets.results);
      setFilterPlanet(dataPlanets.results);
    };
    getPlanets();
  }, []);

  const filterPlanets = ({ target }) => {
    const { value } = target;
    setFilters({ ...filters, filterByName: { name: value } });
  };

  useEffect(() => {
    console.log('entrou no effect');
    let planetsFiltereds = data.filter((planet) => planet.name
      .toLowerCase().includes(name));
    if (filterByNumericValues.length > 0) {
      planetsFiltereds = planetsFiltereds.filter((planet) => {
        let bool = true;
        filterByNumericValues.forEach(({ column, comparison, value }) => {
          switch (comparison) {
          case 'maior que':
            bool = Number(planet[column]) > Number(value) && bool;
            break;
          case 'menor que':
            bool = Number(planet[column]) < Number(value) && bool;
            break;
          case 'igual a':
            bool = Number(planet[column]) === Number(value) && bool;
            break;
          default:
            bool = false;
          }
        });
        return bool;
      });
    }
    setFilterPlanet(planetsFiltereds);
  }, [data, name, filters, filterByNumericValues]);

  const setNumericFilters = (newObj) => {
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, newObj] });
  };
  // meu contexto com informações para passar pros próximos componentes
  const context = { data, filterPlanets, filters, filterPlanet, name, setNumericFilters };
  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
