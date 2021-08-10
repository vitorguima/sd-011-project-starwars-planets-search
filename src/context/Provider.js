import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetAPI from '../help/planetsAPI';
import SWPlanetsContext from '../context/Context';

function SWPlanetsProvider ({ children }) {
  const [loading, setLoading] = useState(false);
  const [planets, setPlanets] = useState([]);

  const fetchPlanets = async () => {
    setLoading(true);
    const getPlanets = await planetAPI();
    setPlanets(getPlanets);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <SWPlanetsContext.Provider
    value={ { 
      loading,
      planets,
      fetchPlanets,
    } }
    >
      { children }
    </SWPlanetsContext.Provider>
  )
}

SWPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SWPlanetsProvider;