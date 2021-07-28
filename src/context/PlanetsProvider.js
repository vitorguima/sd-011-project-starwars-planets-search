import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

// todo provider possui uma deset. do children que é uma Props. Essa props constiui um nó do DOM
function PlanetsProvider({ children }) {
  // requisição da API feita com o useEffect que recebe 2 params. 1 callback e 1 array. A req. vai ser feita como se fosse no didmount
  // useState seta o estado inicial;
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = await fetch(
        'https://swapi-trybe.herokuapp.com/api/planets/',
      );
      // filtra o resultado e deleta as infos indesejadas - residents
      const { results } = await endpoint.json();
      results.filter((result) => delete result.residents);
      setData(results);
    };
    fetchPlanets();
  }, []);

  const valueObj = {
    data,
    filters,
    setFilters,
  };

  return (
    // passando o contexto para o provider - o value é o resultado da fetch:
    <PlanetsContext.Provider value={ valueObj }>
      {children}
    </PlanetsContext.Provider>

  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
