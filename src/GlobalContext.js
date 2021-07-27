import React from 'react';
import PropTypes from 'prop-types';
import fetchApi from './Service/api';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState('');
  const [column, setColumn] = React.useState('population');
  const [comparison, setComparison] = React.useState('maior que');
  const [value, setValue] = React.useState(0);
  console.log(comparison);
  const options = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const setApiToState = () => {
    fetchApi().then((results) => setData(results));
  };

  React.useEffect(setApiToState, []);

  const providerValues = {
    data,
    setData,
    setName,
    options,
    column,
    comparison,
    value,
    setColumn,
    setComparison,
    setValue,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
    },
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
