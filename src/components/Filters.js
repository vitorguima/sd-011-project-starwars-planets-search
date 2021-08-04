import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import InputValues from './InputValues';

function Filters() {
  const {
    filters,
    setToRender,
    data,
    toRender,
    exceptions,
    setExceptions,
  } = useContext(PlanetsContext);

  useEffect(() => {
    const { inputText } = filters;
    const filteredData = data.filter(
      (planet) => planet.name.toLowerCase().includes(inputText.toLowerCase()),
    );

    setToRender(filteredData);
  }, [filters, data, setToRender]);

  function filter() {
    let filteredData = [];
    const magicNumber = 10;
    if (filters.comparissionFilter === 'maior que') {
      filteredData = toRender.filter((planet) => (
        parseInt(planet[filters.columnFilter],
          magicNumber) > parseInt(filters.value, magicNumber)));
    } else if (filters.comparissionFilter === 'menor que') {
      filteredData = toRender.filter((planet) => (
        parseInt(planet[filters.columnFilter],
          magicNumber) < parseInt(filters.value, magicNumber)));
    } else if (filters.comparissionFilter === 'igual a') {
      filteredData = toRender.filter((planet) => (
        parseInt(planet[filters.columnFilter],
          magicNumber) === parseInt(filters.value, magicNumber)));
    }
    setToRender(filteredData);
    setExceptions([...exceptions, filters.columnFilter]);
  }

  return (
    <>
      <InputValues />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ filter }
      >
        Filtrar
      </button>
    </>
  );
}

export default Filters;
