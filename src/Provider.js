import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import AppContext from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getStar = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((dataApi) => dataApi.json());
      setData(results);
    };
    getStar();
  }, []);

  return (
    <div>
      <AppContext.Provider value={ { data, setData } }>
        { children }
      </AppContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
