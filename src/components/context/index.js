import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import getPlanets from '../../services/data';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [listAtt, setList] = useState([]);
  const [filter, setFilter] = useState({
    filters: {
      filterByName: {},
    },
  });
  const contextValue = {
    planets,
    setPlanets,
    filter,
    setFilter,
    listAtt,
  };

  useEffect(() => {
    const dataPlanets = async () => {
      const data = await getPlanets();
      setPlanets(data);
    };
    dataPlanets();
  }, []);

  useEffect(() => {
    const searchLoad = () => {
      const filterPlanets = planets
        .filter((planet) => (planet.name).toLowerCase().includes(filter) === true);
      setList(filterPlanets);
    };
    searchLoad();
  }, [filter, planets]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
