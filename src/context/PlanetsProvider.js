import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

// todo provider possui uma deset. do children que é uma Props. Essa props constiui um nó do DOM
function PlanetsProvider({ children }) {
  // requisição da API feita com o useEffect que recebe 2 params. 1 callback e 1 array. A req. vai ser feita como se fosse no didmount
  // useState seta o estado inicial;
  // const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    data: [],
    newData: [],
    update: false,
    colunFilter: ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    comparisonFilter: ['maior que', 'menor que', 'igual a'],
  });
  // useEffect para
  const { update, filterByNumericValues, data, newData } = filters;

  useEffect(() => {
    if (update === true) {
      let searchData = [];
      const magicNumber = -1;
      const itemArray = filterByNumericValues.length - 1;

      if (itemArray !== magicNumber) {
        const { comparison, value, column } = filterByNumericValues[itemArray];
        if (comparison === 'menor que') {
          searchData = data.filter((elementValue) => (
            Number(elementValue[column]) < value
          ));
        }
        if (comparison === 'maior que') {
          searchData = data.filter((elementValue) => (
            Number(elementValue[column]) > Number(value)
          ));
        }
        if (comparison === 'igual a') {
          searchData = data.filter((elementValue) => (
            Number(elementValue[column]) === Number(value)
          ));
        }
      }

      setFilters({
        ...filters,
        newData: searchData,
        update: false,
      });
    }
  }, [filterByNumericValues, update, filters, newData, data]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = await fetch(
        'https://swapi-trybe.herokuapp.com/api/planets/',
      );
      // filtra o resultado e deleta as infos indesejadas - residents
      const { results } = await endpoint.json();
      // results.filter((result) => delete result.residents);
      setFilters({
        filterByName: { name: '' },
        filterByNumericValues: [],
        data: results,
        newData: results,
        update: false,
        colunFilter: ['population',
          'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
        comparisonFilter: ['maior que', 'menor que', 'igual a'],
      });
    };
    fetchPlanets();
  }, []);

  const valueObj = {
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
