import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context/Context';

import response from '../testData';

export default function Filter({ children }) {
  const [filterPlanets, setFilterPlanets] = useState(response);

  const [filtered, setFiltered] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  const myFilteredContext = {
    filtered,
    setFiltered,
    filterPlanets,
    setFilterPlanets,
  };

  return (
    <Context.Provider value={ myFilteredContext }>
      { children }
    </Context.Provider>
  );
}

Filter.propTypes = ({
  children: PropTypes.node,
}).isRequired;
