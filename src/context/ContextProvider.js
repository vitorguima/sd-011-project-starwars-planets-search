import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from '.';
import getAPI from '../services/API';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const respAPI = async () => {
      const objPlanets = await getAPI();
      setPlanets(objPlanets);
    };
    respAPI();
  }, []);

  return (
    <AppContext.Provider value={ { planets } }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
