import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

function Provider({ children }) {
  const [data, setData] = useState([]);

  const fetchData = () => fetch(url)
    .then((result) => result.json())
    .then(({ results }) => setData(results.map((element) => {
      delete element.residents;
      return element;
    })))
    .catch((err) => err);

  const contextValue = {
    data,
    fetchData,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
