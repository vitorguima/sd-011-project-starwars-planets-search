import React, { useContext, useState } from 'react';
import MainContext from '../context/MainContext';

const listFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

function PlanetsFilter() {
  const {
    data,
    filters,
    setFilters,
    filteredData,
    setFilteredData,
  } = useContext(MainContext);

  const [listFilterChoise, setListFilterChoise] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
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
    listFilter.splice(listFilter.indexOf(listFilterChoise) || 0, 1);
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
    case 'maior que':
      setFilteredData(filteredData.filter((planet) => {
        if (parseInt(planet[listFilterChoise], 10) > valueFilter) return true;
        return false;
      }));
      break;

    case 'menor que':
      setFilteredData(filteredData.filter((planet) => {
        if (parseInt(planet[listFilterChoise], 10) < valueFilter) return true;
        return false;
      }));
      break;

    case 'igual a':
      setFilteredData(filteredData.filter((planet) => {
        if (parseInt(planet[listFilterChoise], 10) === valueFilter) return true;
        return false;
      }));
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
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Valor:
          <input
            id="value-filter"
            data-testid="value-filter"
            type="number"
            onChange={ ({ target: { value } }) => setValueFilter(value) }
            value={ valueFilter }
          />
        </label>
        <button
          type="button"
          onClick={ handleNumericChange }
          data-testid="button-filter"
        >
          Filtrar por valor
        </button>
      </fieldset>
    </form>
  );
}

export default PlanetsFilter;
