import React, { useContext, useState } from 'react';
import SpacesContext from '../context/SpacesContext';

function PlanetFilters() {
  const {
    filters,
    setFilters,
    setFilteredPlanets,
    planetList,
  } = useContext(SpacesContext);
  const initialColumnList = [{ value: 'population', name: 'population' },
    { value: 'orbital_period', name: 'orbital_period' },
    { value: 'diameter', name: 'diameter' },
    { value: 'rotation_period', name: 'rotation_period' },
    { value: 'surface_water', name: 'surface_water' }];
  const initialComparisonList = [{ value: 'maior que', name: 'maior que' },
    { value: 'menor que', name: 'menor que' }, { value: 'igual a', name: 'igual a' }];

  const [planetName, setPlanetName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('higher');
  const [value, setValue] = useState(0);
  const [columnList, setColumnList] = useState(initialColumnList);
  const [comparisonList, setComparisonList] = useState(initialComparisonList);

  function excludeColumnType() {
    setColumnList(columnList.filter((col) => col.value !== column));
  }

  function excludeComparisonType() {
    setComparisonList(comparisonList.filter((comp) => comp.value !== comparison));
  }

  function renderColumnOptions() {
    return (
      columnList.map((col, i) => (
        <option key={ i } value={ col.value }>
          {col.name}
        </option>))
    );
  }

  function renderComparisonOptions() {
    return (
      comparisonList.map((comp, i) => (
        <option key={ i } value={ comp.value }>
          {comp.name}
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
    const compareNumber = Number(compareValue);
    const comparisonTypes = {
      population: {
        'maior que': planetList
          .filter(({ population }) => Number(population) > compareNumber),
        'igual a': planetList
          .filter(({ population }) => Number(population) === compareNumber),
        'menor que': planetList
          .filter(({ population }) => Number(population) < compareNumber),
      },
      orbital_period: {
        'maior que': planetList
          .filter(({ orbital_period: period }) => Number(period) > compareNumber),
        'igual a': planetList
          .filter(({ orbital_period: period }) => Number(period) === compareNumber),
        'menor que': planetList
          .filter(({ orbital_period: period }) => Number(period) < compareNumber),
      },
      diameter: {
        'maior que': planetList
          .filter(({ diameter }) => Number(diameter) > compareNumber),
        'igual a': planetList
          .filter(({ diameter }) => Number(diameter) === compareNumber),
        'menor que': planetList
          .filter(({ diameter }) => Number(diameter) < compareNumber),
      },
      rotation_period: {
        'maior que': planetList
          .filter(({ rotation_period: rot }) => Number(rot) > compareNumber),
        'igual a': planetList
          .filter(({ rotation_period: rot }) => Number(rot) === compareNumber),
        'menor que': planetList
          .filter(({ rotation_period: rot }) => Number(rot) < compareNumber),
      },
      surface_water: {
        'maior que': planetList
          .filter(({ surface_water: water }) => Number(water) > compareNumber),
        'igual a': planetList
          .filter(({ surface_water: water }) => Number(water) === compareNumber),
        'menor que': planetList
          .filter(({ surface_water: water }) => Number(water) < compareNumber),
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
      </form>
    </div>
  );
}

export default PlanetFilters;
