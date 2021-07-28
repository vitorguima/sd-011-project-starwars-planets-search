import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/api';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [dataPlanets, setDataPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);

  const changePlanet = ({ target: { value } }) => {
    const inputPlanetChosen = dataPlanets
      .filter(({ name }) => name.toLowerCase()
        .includes(value.toLowerCase()));

    setPlanets(inputPlanetChosen);
  };

  const contextValues = {
    dataPlanets,
    setDataPlanets,
    planets,
    setPlanets,
    changePlanet,
  };
  useEffect(() => {
    getPlanets()
      .then(({ results }) => {
        results.forEach((obj) => delete obj.residents);
        setDataPlanets(results);
        setPlanets(results);
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
