import React, { useContext, useState } from 'react';
import MainContext from '../context/MainContext';

function PlanetsFilter() {
  const {
    data,
    filters,
    setFilters,
    filteredData,
    setFilteredData,
  } = useContext(MainContext);

  const listFilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const [listFilterChoise, setListFilterChoise] = useState();
  const [comparisonFilter, setComparisonFilter] = useState('Maior');
  const [valueFilter, setValueFilter] = useState(0);

  function handleNameChange(value) {
    const newData = data.filter((planet) => {
      if (planet.name.includes(value)) return true;
      return false;
    });
    setFilteredData(newData);
    setFilters({ ...filters, filterByName: { name: value } });
  }

  async function handleNumericChange() {
    listFilter.shift();
    console.log(listFilter);
    await setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column: listFilterChoise,
          comparison: comparisonFilter,
          value: valueFilter,
        },
      ],
    });

    switch (comparisonFilter) {
    case 'Maior':
      filters.filterByNumericValues.forEach((filter) => {
        setFilteredData(filteredData.filter((planet) => {
          console.log(planet);
          console.log(filter);
          if (parseFloat(planet[listFilterChoise]) > filter.value) return true;
          return false;
        }));
      });
      break;

    case 'Menor':
      filters.filterByNumericValues.forEach((filter) => {
        setFilteredData(filteredData.filter((planet) => {
          if (parseFloat(planet[listFilterChoise]) < filter.value) return true;
          return false;
        }));
      });
      break;

    case 'Igual':
      filters.filterByNumericValues.forEach((filter) => {
        setFilteredData(filteredData.filter((planet) => {
          if (parseFloat(planet[listFilterChoise]) === filter.value) return true;
          return false;
        }));
      });
      break;

    default:
      setFilteredData(data);
    }
  }

  return (
    <form>
      <fieldset>
        <legend>Filtrar</legend>
        <label htmlFor="name-filter">
          Nome:
          <input
            id="name-filter"
            data-testid="name-filter"
            placeholder="Tatooine"
            onChange={ ({ target: { value } }) => handleNameChange(value) }
          />
        </label>
        <p>Valores numéricos:</p>
        <label htmlFor="column-filter">
          Filtro:
          <select
            data-testid="column-filter"
            id="column-filter"
            onChange={ ({ target: { value } }) => setListFilterChoise(value) }
            value={ listFilterChoise }
          >
            { listFilter.map((filter) => <option key={ filter }>{filter}</option>)}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Faixa de valor:
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            value={ comparisonFilter }
            onChange={ ({ target: { value } }) => setComparisonFilter(value) }
          >
            <option>Maior</option>
            <option>Menor</option>
            <option>Igual</option>
          </select>
        </label>
        <label htmlFor="column-filter">
          Valor:
          <input
            type="number"
            onChange={ ({ target: { value } }) => setValueFilter(value) }
            value={ valueFilter }
          />
        </label>
        <button type="button" onClick={ handleNumericChange }>Filtrar por valor</button>
      </fieldset>
    </form>
  );
}

export default PlanetsFilter;
