import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './Context';

function Provider({ children }) {
  const initialState = {
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  };
  const [data, setData] = useState({ data: '' });
  const [bckp, setBckp] = useState({ bckpdata: '' });
  const [headers, setHeaders] = useState([]);
  const [state, setState] = useState(initialState);

  const handleChange = ({ target: { value } }) => {
    const { bckpdata } = bckp;
    setState({
      filters: {
        ...state.filters,
        filterByName: {
          name: value,
        },
      },
    });
    setData({
      data: !value
        ? bckpdata : bckpdata.filter((planet) => planet.name.includes(value)),
    });
  };

  const handleClick = ({ column, comparison, value }) => {
    setState({
      filters: {
        ...state.filters,
        filterByNumericValues:
          [...state.filters.filterByNumericValues, { column, comparison, value }] },
    });
  };

  const deleteFilter = (target) => {
    setState({
      filters: {
        ...state.filters,
        filterByNumericValues:
          state.filters.filterByNumericValues
            .filter((el) => el.column !== target.value) },
    });
    setData({ data: bckp.bckpdata });
  };

  useEffect(() => {
    const { filters: { filterByNumericValues } } = state;
    const { bckpdata } = bckp;
    let res = null;
    const result = () => {
      if (filterByNumericValues.length) {
        filterByNumericValues.forEach((fil) => {
          switch (fil.comparison) {
          case 'maior que':
            res = bckpdata
              .filter((planet) => Number(planet[fil.column]) > Number(fil.value));
            break;
          case 'menor que':
            res = bckpdata
              .filter((planet) => Number(planet[fil.column]) < Number(fil.value));
            break;
          default:
            res = bckpdata
              .filter((planet) => Number(planet[fil.column]) === Number(fil.value));
            break;
          }
        });
      }
      return res || data.data;
    };
    setData({ data: result() });
  }, [state]);

  useEffect(() => {
    const APIcall = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setData({
        data: results,
      });
      setBckp({ bckpdata: results });
      results.map((planet) => delete planet.residents);
      setHeaders(Object.keys(results[0]));
    };
    APIcall();
    console.log('oi');
  }, []);

  const context = {
    ...state,
    data,
    bckp,
    headers,
    handleChange,
    handleClick,
    deleteFilter,
  };

  return (
    <GlobalContext.Provider value={ context }>
      {children}
    </GlobalContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
