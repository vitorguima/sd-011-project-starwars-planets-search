import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setNameFilter] = useState('');

  const URL_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    fetch(URL_API)
      .then((response) => {
        response.json()
          .then(({ results }) => setData(results));
      });
  }, []);
  // array de dependencias para o componente nao renderizar mais de uma vez, sem ele o componente é diparado toda vez que renderiza

  const contextValue = {
    data,
    filters: {
      filterByName: {
        name,
      },
    },
    setNameFilter,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}
// descreve qualquer coisa que pode ser renderizada - strings, números, elementos ou um array
MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyProvider;
