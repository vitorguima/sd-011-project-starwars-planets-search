import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/api';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState('name');
  const [sort, setSort] = useState('asc');
  const [order, setOrder] = useState({ column: 'name', sort: 'asc' });
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('100000');
  // const [filters, setFilters] = useState({ filterByName: { name: '' },
  //   filterByNumericValues: [] });
  const [theRender, setTheRender] = useState([]);
  const [name, setName] = useState('');
  const [numeric, setNumeric] = useState([]);

  useEffect(() => {
    setTheRender(data);
    if (name !== '') {
      const filteredPlanets = data
        .filter((planet) => planet.name.toLowerCase().includes(name));
      setTheRender(filteredPlanets);
    } else if (name === '') {
      setTheRender(data);
    }
  }, [data, name, theRender]);

  console.log(order);

  // function sortColumns(orderl, filtereds) {
  //   const magicNumber = -1;
  //   switch (true) {
  //   case orderl.sort === 'asc' && (orderl.column === 'name'):
  //     setTheRender(filtereds.sort((a, b) => (
  //       (a[orderl.column] > b[orderl.column]) ? 1 : magicNumber)));
  //     break;
  //   case orderl.sort === 'desc' && (orderl.column === 'name'):
  //     setTheRender(filtereds.sort((a, b) => (
  //       (a[orderl.column] < b[orderl.column]) ? 1 : magicNumber)));
  //     break;
  //   case orderl.sort === 'asc' && (orderl.column !== 'name'):
  //     setTheRender(filtereds.sort((a, b) => Number(a[orderl.column]) - Number(b[orderl.column])));
  //     break;
  //   case orderl.sort === 'desc' && (orderl.column !== 'name'):
  //     setTheRender(filtereds.sort((a, b) => Number(b[orderl.column]) - Number(a[orderl.column])));
  //     break;
  //   default:
  //     setTheRender(filtereds);
  //   }
  // }

  useEffect(() => {
    let filtereds;
    const magicNumber = -1;
    if (order.sort === 'asc' && (order.column === 'name')) {
      filtereds = theRender
        .sort((a, b) => ((a[order.column] > b[order.column]) ? 1 : magicNumber));
      setTheRender(filtereds);
    } else if (order.sort === 'desc' && (order.column === 'name')) {
      filtereds = theRender
        .sort((a, b) => ((a[order.column] < b[order.column]) ? 1 : magicNumber));
      setTheRender(filtereds);
    } else if (order.sort === 'asc' && (order.column !== 'name')) {
      filtereds = theRender
        .sort((a, b) => Number(a[order.column]) - Number(b[order.column]));
      setTheRender(filtereds);
    } else if (order.sort === 'desc' && (order.column !== 'name')) {
      filtereds = theRender
        .sort((a, b) => Number(b[order.column]) - Number(a[order.column]));
      setTheRender(filtereds);
    }
  }, [order.sort, order.column, theRender]);

  useEffect(() => {
    if (numeric !== []) {
      numeric.forEach((curr) => {
        let filterPlanetsByNums;
        if (curr.comparison === 'maior que') {
          filterPlanetsByNums = data
            .filter((planet) => Number(planet[curr.column]) > Number(curr.value));
          setTheRender(filterPlanetsByNums);
        } else if (curr.comparison === 'menor que') {
          filterPlanetsByNums = data
            .filter((planet) => Number(planet[curr.column]) < Number(curr.value));
          setTheRender(filterPlanetsByNums);
        } else if (curr.comparison === 'igual a') {
          filterPlanetsByNums = data
            .filter((planet) => Number(planet[curr.column]) === Number(curr.value));
          setTheRender(filterPlanetsByNums);
        }
      });
    } else {
      setTheRender(data);
    }
  }, [data, numeric]);

  function handleFilterButton() {
    const arr = [...numeric];
    arr.push({ column, comparison, value });
    setNumeric([...arr]);
    // console.log(numeric);
  }

  async function asyncFunc() {
    setData(await fetchPlanets());
  }

  useEffect(() => {
    asyncFunc();
  }, []);

  function handleInputPlanet(event) {
    setName(event.target.value);
  }

  const valuesContext = {
    handleInputPlanet,
    data,
    setColumn,
    setComparison,
    setValue,
    setNumeric,
    handleFilterButton,
    theRender,
    setTheRender,
    numeric,
    sortColumn,
    sort,
    setSortColumn,
    setSort,
    // sortColumns,
    setOrder,
    order,
  };

  return (
    <PlanetsContext.Provider value={ valuesContext }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node.isRequired,
};
