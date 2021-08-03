import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });
  // estado onde esta salvo o filtro por nome
  const [filterPlanets, SetFilterPlanets] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const resultsComplet = await fetch(endpoint).then((itens) => itens.json());
      setData(resultsComplet.results);
    };
    getData();
  }, []);

  // função que faz o filtro do nome
  function FilterName() {
    const namePlanets = data.filter(
      (planet) => planet.name.toLowerCase().includes(filters.filterByName.name),
    );
    SetFilterPlanets(namePlanets);
  }

  // função para fazer filtro  numerico
  const [filterNumber, setFilterNumber] = useState([]);

  function FilterNumberFunc() {
    const filterColumn = filters.filterByNumericValues.column;
    const filterComparison = filters.filterByNumericValues.comparison;
    const filterValue = Number(filters.filterByNumericValues.value);
    if (filterComparison === 'maior que' && filterColumn === filterPlanets) {
      const planetFilterName = data.filter(
        (planet) => planet.Key === filterColumn && Number(planet) > filterValue,
      );
      setFilterNumber(planetFilterName);
    }
    if (filterComparison === 'menor que' && filterColumn === filterPlanets) {
      const planetFilterName = data.filter(
        (planet) => planet.Key === filterColumn && Number(planet) < filterValue,
      );
      setFilterNumber(planetFilterName);
    }
    if (filterComparison === 'igual a' && filterColumn === filterPlanets) {
      const planetFilterName = data.filter(
        (planet) => planet.Key === filterColumn && Number(planet) === filterValue,
      );
      setFilterNumber(planetFilterName);
    }
  }

  useEffect(FilterName, [filters]);

  const myPlanets = {
    data,
    filterPlanets,
    setFilter,
    filters,
    filterNumber,
    FilterNumberFunc,
  };

  return (
    <PlanetContext.Provider value={ myPlanets }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = ({
  children: PropTypes.node,
}).isRequired;

export default PlanetProvider;
