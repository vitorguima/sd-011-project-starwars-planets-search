import React, { createContext, useEffect, useReducer } from 'react';
import { PropTypes } from 'prop-types';
import getAPI from '../services/API';

export const Context = createContext();

export default function PlanetContext({ children }) {
  const initialState = {
    data: null,
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: 'population',
          comparison: '>',
          value: null,
        },
      ],
    },
  };

  const reducer = (state, action) => {
    const { type, data, payload } = action;
    switch (type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...payload },
      };

    case 'SET_DATA':
      return {
        ...state,
        data,
      };

    default:
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const setData = (data) => dispatch({ type: 'SET_DATA', data });
  const setFilter = (name, filter) => dispatch({
    type: 'SET_FILTERS',
    payload: { [filter]: { name } } });
  const setNumericFilter = (data) => dispatch({
    type: 'SET_FILTERS',
    payload: {
      filterByNumericValues: [data],
    },
  });

  useEffect(() => {
    (async () => {
      const api = await getAPI();
      setData(api);
    })();
  }, []);

  const planetState = { ...state, setFilter, setNumericFilter };

  return <Context.Provider value={ planetState }>{children}</Context.Provider>;
}

PlanetContext.propTypes = {
  children: PropTypes.node.isRequired,
};
