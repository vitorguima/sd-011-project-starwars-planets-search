import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import getPlanets from '../services/API';

function SWProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataPlanets = async () => {
      const listPlanets = await getPlanets();
      setData(listPlanets);
    };
    dataPlanets();
  }, []);

  const context = { data };
  // console.log(context);
  return (
    <div>
      <SWContext.Provider value={ context }>
        {children}
      </SWContext.Provider>
    </div>
  );
}

SWProvider.propTypes = {
  children: PropTypes.elements,
}.isRequired;

export default SWProvider;
