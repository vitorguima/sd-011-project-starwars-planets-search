import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from '.';
import getAPI from '../services/API';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [type, setType] = useState({ filters: { filterByName: { name: '' } } });

  useEffect(() => {
    const respAPI = async () => {
      const objPlanets = await getAPI();
      setPlanets(objPlanets);
    };
    respAPI();
  }, []);

  const getByType = ({ target }) => {
    const { value } = target;
    setType({ filters: { filterByName: { name: value } } });
  };

  const filterByType = () => {
    const { filters: { filterByName: { name } } } = type;
    if (name) {
      const planetNames = planets.filter((planet) => planet.name.includes(name));
      return planetNames;
    }
    return planets;
  };

  return (
    <AppContext.Provider value={ { getByType, filterByType } }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
