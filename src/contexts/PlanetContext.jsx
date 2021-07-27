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
      filterByNumericValues: [],
    },
  };

  const reducer = (state, action) => {
    const { type, data, payload } = action;
    const filtered = state.filters.filterByNumericValues.filter(
      (filter, index) => index !== payload,
    );

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

    case 'REMOVE_FILTERS':

      return {
        ...state,
        filters: { ...state.filters, filterByNumericValues: filtered } };

    default:
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const setData = (data) => dispatch({ type: 'SET_DATA', data });
  const removeFilters = (index) => dispatch({ type: 'REMOVE_FILTERS', payload: index });
  const setFilter = (name, filter) => dispatch({
    type: 'SET_FILTERS',
    payload: { [filter]: { name } } });

  const setNumericFilter = (data) => {
    const { filters } = state;
    const { filterByNumericValues } = filters;
    const newFilter = filterByNumericValues;

    dispatch({
      type: 'SET_FILTERS',
      payload: {
        filterByNumericValues: [...newFilter, data],
      },
    });
  };

  useEffect(() => {
    (async () => {
      const api = await getAPI();
      setData(api);
    })();
  }, []);

  const planetState = { ...state, setFilter, setNumericFilter, removeFilters };

  return <Context.Provider value={ planetState }>{children}</Context.Provider>;
}

PlanetContext.propTypes = {
  children: PropTypes.node.isRequired,
};
