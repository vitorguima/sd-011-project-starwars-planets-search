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
      order: {
        column: 'name',
        sort: 'ASC' },
      savedFilters: [
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water'],
    },
  };

  const reducer = (state, action) => {
    const { type, data, payload } = action;
    const filterOptions = state.filters.filterByNumericValues.filter(
      (filter) => filter.column !== payload,
    );
    const newSavedFilters = [...state.filters.savedFilters, payload];

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
        filters: { ...state.filters,
          filterByNumericValues: filterOptions,
          savedFilters: [...newSavedFilters] },
      };

    case 'SET_ORDER':
      return {
        ...state,
        filters: { ...state.filters, order: payload },
      };

    default:
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const setData = (data) => dispatch({ type: 'SET_DATA', data });

  const removeFilters = (column) => {
    dispatch({ type: 'REMOVE_FILTERS', payload: column });
  };
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
        savedFilters: filters.savedFilters.filter((filter) => filter !== data.column),
        filterByNumericValues: [...newFilter, data],
      },
    });
  };

  const setOrder = (order) => {
    dispatch({
      type: 'SET_ORDER',
      payload: order,
    });
  };

  useEffect(() => {
    (async () => {
      const api = await getAPI();
      setData(api);
    })();
  }, []);

  const planetState = { ...state, setFilter, setNumericFilter, removeFilters, setOrder };

  return <Context.Provider value={ planetState }>{children}</Context.Provider>;
}

PlanetContext.propTypes = {
  children: PropTypes.node.isRequired,
};
