import React, { useContext, useState } from 'react';
import ContextPlanetsApi from '../context/ContextPlanetsApi';

function Table() {
  const { namePlanets, options, filters, setFilters, column, setColumn,
    comparison, setComparison, value, setValue } = useContext(ContextPlanetsApi);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  const filterByName = nameFilter ? namePlanets
    .filter((planet) => planet.name.includes(nameFilter)) : namePlanets;

  const filterByHigherThan = namePlanets
    .filter((planet) => planet[column] > Number(value));

  const filterByLessThan = namePlanets
    .filter((planet) => planet[column] < Number(value));

  const filterByEqual = namePlanets
    .filter((planet) => Number(planet[columnFilter]) === Number(value));

  const renderPlanets = () => {
    if (nameFilter) {
      return filterByName;
    }
    if (comparison === 'maior que') {
      return filterByHigherThan;
    }
    if (comparison === 'menor que') {
      return filterByLessThan;
    }
    if (comparison === 'igual a') {
      return filterByEqual;
    }
    return namePlanets;
  };

  function handleClick() {
    setColumn(columnFilter);
    setComparison(comparisonFilter);
    setValue(valueFilter);
    const objectNumbers = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    setFilters({
      ...filters,
      filterByNumericValues:
        [...filters.filterByNumericValues, objectNumbers],
    });
  }

  return (
    <section>
      <form>
        <label htmlFor="name">
          Planet Name:
          <input
            type="text"
            data-testid="name-filter"
            onChange={ ({ target }) => {
              setNameFilter(target.value); setFilters({
                ...filters,
                filterByName: { name: target.value },
              });
            } }
          />
        </label>
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          {options.map((option, index) => <option key={ index }>{option}</option>)}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparisonFilter(target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ ({ target }) => setValueFilter(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation_period</th>
            <th>Orbital_period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface_water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {renderPlanets().map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

  );
}

export default Table;
