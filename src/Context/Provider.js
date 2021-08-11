import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [value] = useState(0);
  const [sortColumn, setSortColumn] = useState('name');
  const [orderSort, setOrderSort] = useState('ASC');
  const [filterPlanets, setFilterPlanets] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  const [column, setColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [comparison] = ([
    'maior que',
    'menor que',
    'igual a',
  ]);

  const orderOptions = [
    'name',
    'climate',
    'created',
    'diameter',
    'edited',
    'gravity',
    'orbital_period',
    'population',
    'rotation_period',
    'surface_water',
    'terrain',
  ];

  const categories = [
    'name',
    'climate',
    'created',
    'edited',
    'gravity',
    'terrain',
  ];

  const sorting = (ordered, num, a, b) => {
    const { order } = filterPlanets;
    const findCategory = categories.find((cat) => cat === ordered.column);
    const magicNumber = -1;
    if (order.sort === 'ASC') {
      if (findCategory) {
        return a[ordered.column] > b[ordered.column] ? 1 : magicNumber;
      }
      return num > 0 ? 1 : magicNumber;
    }
    if (findCategory) {
      return a[order.column] > b[order.column] ? 1 : magicNumber;
    }
    return num > 0 ? magicNumber : 1;
  };

  const setSort = (array) => {
    const { order } = filterPlanets;
    array.sort((a, b) => {
      const num = a[order.column] - b[order.column];
      return sorting(order, num, a, b);
    });
  };

  useEffect(() => {
    const getPlanets = async () => {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endPoint)
        .then((planets) => planets.json())
        .then((planet) => planet);
      setData(results);
    };
    getPlanets();
  }, []);

  const toSort = () => {
    const filtered = {
      column: sortColumn,
      sort: orderSort,
    };
    setFilterPlanets({ ...filterPlanets, order: filtered });
  };

  const filterPlanetValues = async () => {
    const { filterByNumericValues: number } = filterPlanets;
    const updateFilter = {
      column,
      value,
      comparison,
    };
    await setFilterPlanets({
      ...filterPlanets, filterByNumericValues: [...number, updateFilter],
    });
    const selectColumn = document.querySelector('#column').value;
    setColumn(selectColumn);
  };

  const myDataPlanets = {
    data,
    setData,
    filterPlanets,
    setFilterPlanets,
    column,
    setColumn,
    value,
    comparison,
    filterPlanetValues,
    toSort,
    orderOptions,
    setSortColumn,
    setOrderSort,
    setSort,
  };

  return (
    <Context.Provider value={ myDataPlanets }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = ({
  children: PropTypes.func,
}).isRequired;

export default Provider;
