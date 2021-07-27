import React, { useContext, useState } from 'react';
import SpacesContext from '../context/SpacesContext';

function PlanetFilters() {
  const {
    filters,
    setFilters,
    setFilteredPlanets,
    planetList,
  } = useContext(SpacesContext);
  const initialColumnList = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const initialComparisonList = ['maior que', 'menor que', 'igual a'];

  const [planetName, setPlanetName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('higher');
  const [value, setValue] = useState(0);
  const [columnList, setColumnList] = useState(initialColumnList);
  const [comparisonList, setComparisonList] = useState(initialComparisonList);

  function excludeColumnType() {
    setColumnList(columnList.filter((col) => col !== column));
  }

  function excludeComparisonType() {
    setComparisonList(comparisonList.filter((comp) => comp !== comparison));
  }

  function renderColumnOptions() {
    return (
      columnList.map((col, i) => (
        <option key={ i } value={ col }>
          {col}
        </option>))
    );
  }

  function renderComparisonOptions() {
    return (
      comparisonList.map((comp, i) => (
        <option key={ i } value={ comp }>
          {comp}
        </option>))
    );
  }

  function handleNameInput(target) {
    setPlanetName(target.value);
    setFilters({ ...filters, filterByName: { name: target.value } });
    setFilteredPlanets(
      planetList
        .filter(({ name }) => name.toLowerCase().includes(target.value.toLowerCase())),
    );
  }
  function handleFilters() {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  }

  function handleNumberInputs(target) {
    const functions = {
      column: setColumn,
      comparison: setComparison,
      value: setValue,
    };
    functions[target.name](target.value);
  }

  function handleFilterButton(columnName, compareLogic, compareValue) {
    const compare = Number(compareValue);
    const comparisonTypes = {
      population: {
        'maior que': planetList
          .filter(({ population }) => Number(population) > compare),
        'igual a': planetList
          .filter(({ population }) => Number(population) === compare),
        'menor que': planetList
          .filter(({ population }) => Number(population) < compare),
      },
      orbital_period: {
        'maior que': planetList
          .filter(({ orbital_period: period }) => Number(period) > compare),
        'igual a': planetList
          .filter(({ orbital_period: period }) => Number(period) === compare),
        'menor que': planetList
          .filter(({ orbital_period: period }) => Number(period) < compare),
      },
      diameter: {
        'maior que': planetList
          .filter(({ diameter }) => Number(diameter) > compare),
        'igual a': planetList
          .filter(({ diameter }) => Number(diameter) === compare),
        'menor que': planetList
          .filter(({ diameter }) => Number(diameter) < compare),
      },
      rotation_period: {
        'maior que': planetList
          .filter(({ rotation_period: rot }) => Number(rot) > compare),
        'igual a': planetList
          .filter(({ rotation_period: rot }) => Number(rot) === compare),
        'menor que': planetList
          .filter(({ rotation_period: rot }) => Number(rot) < compare),
      },
      surface_water: {
        'maior que': planetList
          .filter(({ surface_water: water }) => Number(water) > compare),
        'igual a': planetList
          .filter(({ surface_water: water }) => Number(water) === compare),
        'menor que': planetList
          .filter(({ surface_water: water }) => Number(water) < compare),
      },
    };
    handleFilters();
    if (columnName && compareLogic && compareValue) {
      setFilteredPlanets(comparisonTypes[columnName][compareLogic]);
    } else {
      setFilteredPlanets(planetList);
    }
    excludeColumnType(); excludeComparisonType();
  }

  function removeFilter(columnName, compareType) {
    setFilteredPlanets(planetList);
    setColumnList([...columnList, columnName]);
    setComparisonList([...comparisonList, compareType]);
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues
        .filter((filter) => filter.column !== columnName
        && filter.comparison !== compareType),
    });
  }

  function renderAppliedFilters() {
    const { filterByNumericValues } = filters;
    return (
      filterByNumericValues.map((filter, i) => (
        <div key={ i } data-testid="filter">
          <span>{ filter.column }</span>
          <span>{ filter.comparison }</span>
          <span>{ filter.value }</span>
          <button
            type="button"
            onClick={ () => removeFilter(column, comparison) }
          >
            X
          </button>
        </div>
      )));
  }

  return (
    <div>
      <form>
        <label htmlFor="filter-by-name">
          <input
            id="filter-by-name"
            type="text"
            data-testid="name-filter"
            placeholder="busque pelo nome"
            name="name-filter"
            value={ planetName }
            onChange={ ({ target }) => handleNameInput(target) }
          />
        </label>
        <label htmlFor="filter-by-column">
          Filtro por categoria
          <select
            value={ column }
            data-testid="column-filter"
            id="filter-by-column"
            onChange={ ({ target }) => handleNumberInputs(target) }
            name="column"
          >
            {columnList ? renderColumnOptions() : null}
          </select>
        </label>
        <label htmlFor="filter-by-range">
          Raio do valor
          <select
            data-testid="comparison-filter"
            id="filter-by-range"
            value={ comparison }
            onChange={ ({ target }) => handleNumberInputs(target) }
            name="comparison"
          >
            {comparisonList ? renderComparisonOptions() : null}
          </select>
        </label>
        <label htmlFor="range-value">
          <input
            id="range-value"
            type="number"
            data-testid="value-filter"
            placeholder="insira o valor da busca"
            value={ value }
            onChange={ ({ target }) => handleNumberInputs(target) }
            name="value"
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => handleFilterButton(column, comparison, value) }
        >
          Filtrar
        </button>
        <div className="applied-filters">
          { renderAppliedFilters() }
        </div>
      </form>
    </div>
  );
}

export default PlanetFilters;
