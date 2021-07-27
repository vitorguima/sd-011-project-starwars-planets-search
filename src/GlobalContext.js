import React from 'react';
import PropTypes from 'prop-types';
import fetchApi from './Service/api';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const initialState = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };

  const [data, setData] = React.useState([]);
  const [column, setColumn] = React.useState('');
  const [comparison, setComparison] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [filters, setFilters] = React.useState(initialState);
  const [options, setOptions] = React.useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const setApiToState = () => {
    fetchApi().then((results) => setData(results));
  };

  React.useEffect(setApiToState, []);

  const providerValues = {
    data,
    setData,
    options,
    setOptions,
    column,
    comparison,
    value,
    setColumn,
    setComparison,
    setValue,
    filters,
    setFilters,
  };

  return (
    <GlobalContext.Provider value={ providerValues }>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalStorage.propTypes = {
  children: PropTypes.node.isRequired,
};
