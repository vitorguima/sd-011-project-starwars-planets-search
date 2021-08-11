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
    console.log('input');
  }, [data, name, theRender]);

  useEffect(() => {
    let filtereds;
    const magicNumber = -1;
    if (order.sort === 'asc' && (order.column === 'name')) {
      filtereds = theRender
        .sort((a, b) => ((a[order.column] > b[order.column]) ? 1 : magicNumber));
      console.log(1);
      setTheRender(filtereds);
    } else if (order.sort === 'desc' && (order.column === 'name')) {
      filtereds = theRender
        .sort((a, b) => ((a[order.column] < b[order.column]) ? 1 : magicNumber));
      console.log(2);

      setTheRender(filtereds);
    } else if (order.sort === 'asc' && (order.column !== 'name')) {
      filtereds = theRender
        .sort((a, b) => Number(a[order.column]) - Number(b[order.column]));
      console.log(3);

      setTheRender(filtereds);
    } else if (order.sort === 'desc' && (order.column !== 'name')) {
      filtereds = theRender
        .sort((a, b) => Number(b[order.column]) - Number(a[order.column]));
      console.log(4);

      setTheRender(filtereds);
    }
  }, [order, theRender]);

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
    setOrder,
    order,
  };

  console.log(theRender);

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
