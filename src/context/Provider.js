import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import starApi from '../services/starApi';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: 'population',
          comparison: 'maior que',
          value: '1',
        },
      ],
    },
  });

  const fetchApi = async () => {
    const response = await starApi();
    setData(response);
  };

  useEffect(() => { fetchApi(); }, []);

  const globalState = { data, setData, filterName, setFilterName };

  return (
    <Context.Provider value={ globalState }>
      {children}
    </Context.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
