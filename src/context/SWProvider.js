import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import getPlanets from '../services/API';

function SWProvider({ children }) {
  // const options = [
  //   population,
  //   orbital_period,
  //   diameter,
  //   rotation_period,
  //   surface_water
  // ];

  const [data, setData] = useState([]);

  const [filterPlanets, setFilterPlanets] = useState([]);

  // const [] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });

  const applyFilter = () => {
    const result = data.filter((val) => (
      val.name.includes(filters.filterByName.name)));
    setFilterPlanets(result);
  };

  useEffect(() => {
    const dataPlanets = async () => {
      const listPlanets = await getPlanets();
      setData(listPlanets);
      setFilterPlanets(listPlanets);
    };
    dataPlanets();
  }, []);

  const context = {
    filters,
    filterPlanets,
    applyFilter,
    setFilters,
  };

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
