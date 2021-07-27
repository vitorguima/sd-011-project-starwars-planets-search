import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getCurrentPlanetsAPI from '../services/planetsApi';

const PlanetsProvider = ({ children }) => {
  // criando os estados
  const [data, setData] = useState([]);

  // fazendo requisição da api e excluindo titulo: residents
  const fetchPlanets = async () => {
    const { results } = await getCurrentPlanetsAPI();
    results.filter((element) => delete element.residents);
    setData(results);
  };

  // lidando com efeitos
  useEffect(() => {
    fetchPlanets();
  }, []);

  const myContext = { data };

  // children - filhos do componente
  return (
    <PlanetsContext.Provider value={ myContext }>
      { children }
    </PlanetsContext.Provider>
  );
};

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
