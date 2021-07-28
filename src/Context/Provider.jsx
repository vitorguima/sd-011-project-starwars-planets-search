import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, getName] = useState([]);
  const [keyWord, getKeyWord] = useState(data);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint)
        .then((receivedData) => receivedData.json());
      const filteredResults = Object.values(results);
      filteredResults.map((test) => {
        test.residents.splice(0, test.residents.length);
        return test;
      });

      const condition = keyWord.length !== 0 ? data : filteredResults;
      if (name.length === 0) { setData(condition); getKeyWord(condition); }
      if (name.length !== 0) {
        const filterData = condition.filter((element) => element.name
          .toLowerCase().includes(name.toLowerCase()));
        setData(filterData);
        getKeyWord(filterData);
      }
    };

    getPlanets();
  }, [name, data, keyWord.length]);

  const obj = {
    data,
    setData,
    getName,
    filters: {
      filterByName: {
        name,
      },
    },
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
