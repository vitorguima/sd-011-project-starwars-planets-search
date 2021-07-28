import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, getData] = useState([]);
  const [newData, getNewData] = useState([]);
  const [name, getName] = useState('');
  // column, comparison, value
  const [column, getColumn] = useState('');
  const [comparison, getComparison] = useState('');
  const [value, getValue] = useState('');
  const [filterByNumericValues, getFilterByNumericValues] = useState([{
    column, comparison, value }]);

  useEffect(() => getFilterByNumericValues([{
    column, comparison, value }]), [column, comparison, value]);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

      // !requisição API
      const { results } = await fetch(endpoint)
        .then((receivedData) => receivedData.json());
      const filteredResults = Object.values(results);

      filteredResults.map((comp) => {
        comp.residents.splice(0, comp.residents.length);
        return comp;
      });

      getData(filteredResults);
    };

    getPlanets();
  }, []);

  // useEffect(() => {
  //   const condition = newData.length !== 0 ? newData : data;
  //   if (name.length !== 0) {
  //     const filterData = condition.filter((element) => element.name
  //       .toLowerCase().includes(name.toLowerCase()));
  //     // #Salvando data com filtro para uma futura filtragem
  //     getNewData(filterData);
  //     getData(filterData);
  //   }
  // }, [name, data, newData])

  const obj = {
    data,
    getData,
    getName,
    name,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues,
    },
    getColumn,
    getComparison,
    getValue,
    newData,
    getNewData,
  };
  return (
    <PlanetsContext.Provider value={ obj }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.array,
}.isRequired;
