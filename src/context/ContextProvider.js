import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import AppContext from '.';
import getAPI from '../services/API';

function AppProvider({ children }) {
  const INITIAL_STATE = {
    dataAPI: [],
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  };

  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
    case 'GET_DATA':
      return { ...state, dataAPI: payload };
    case 'CHANGE_TYPE':
      return { ...state, filters: { ...state.filters, filterByName: { name: payload } } };
    case 'SUBMIT_TYPE':
      return { ...state,
        filters: {
          ...state.filters,
          filterByNumericValues:
            [...state.filters.filterByNumericValues, { ...payload }],
        },
      };
    default:
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchAPI = (payload) => dispatch({ type: 'GET_DATA', payload });

  const handleType = (payload) => dispatch({ type: 'CHANGE_TYPE', payload });

  const handleClickSubmit = (payload) => dispatch({ type: 'SUBMIT_TYPE', payload });

  useEffect(() => {
    const respAPI = async () => {
      const objPlanets = await getAPI();
      fetchAPI(objPlanets);
    };
    respAPI();
  }, []);

  const provider = {
    state,
    handleType,
    handleClickSubmit,
  };

  return (
    <AppContext.Provider value={ provider }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
