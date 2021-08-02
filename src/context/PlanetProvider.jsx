import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/api';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [dataPlanets, setDataPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [filterPreference, setFilterPreference] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  });

  const columnsOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const comparisonOptions = ['maior que', 'menor que', 'igual a'];

  const changePlanet = ({ target: { value } }) => {
    const inputPlanetChosen = dataPlanets
      .filter(({ name }) => name.toLowerCase()
        .includes(value.toLowerCase()));

    setFilterPlanets(inputPlanetChosen);
  };

  const filterNumbers = ({ columnFilter, comparisonFilter, valueFilter }) => {
    const filterTable = dataPlanets.filter((el) => {
      const column = Number(el[columnFilter]);
      const value = Number(valueFilter);
      if (comparisonFilter === 'maior que') {
        return column > value;
      }
      if (comparisonFilter === 'menor que') {
        return column < value;
      }
      return column === value;
    });
    setFilterPreference(filterTable);
  };

  const handleClickTable = (e) => {
    filterNumbers(filterPreference);
    e.preventDefault();
  };

  const contextValues = {
    dataPlanets,
    setDataPlanets,
    filterPlanets,
    setFilterPlanets,
    columnsOptions,
    comparisonOptions,
    changePlanet,
    filterPreference,
    handleClickTable,
  };
  useEffect(() => {
    getPlanets()
      .then(({ results }) => {
        results.forEach((obj) => delete obj.residents);
        setDataPlanets(results);
        setFilterPlanets(results);
      });
  }, []);

  return (
    <PlanetContext.Provider value={ contextValues }>
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;

PlanetProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
