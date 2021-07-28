import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, setFilters, filters, options, column, setColumn, comparison,
    setComparison, value, setValue } = useContext(PlanetsContext);
  const [columnState, setColumnState] = useState('population');
  const [comparisonState, setComparisonState] = useState('maior que');
  const [valueState, setValueState] = useState(0);
  console.log(typeof valueState);

  const [inputName, setInputName] = useState('');
  const filterData = inputName ? data.filter((planet) => planet
    .name.includes(inputName)) : data;
  const filterMaior = data.filter((planet) => planet[column] > Number(value));
  const filterMenor = data.filter((planet) => planet[column] < Number(value));
  const filterIgual = data.filter((planet) => Number(planet[column]) === Number(value));

  function renderFilter() {
    if (inputName) {
      return filterData;
    }
    if (comparison === 'maior que') {
      return filterMaior;
    }
    if (comparison === 'menor que') {
      return filterMenor;
    }
    if (comparison === 'igual a') {
      return filterIgual;
    }
    return data;
  }

  function handleClick() {
    setColumn(columnState);
    setComparison(comparisonState);
    setValue(valueState);
    const newObject = {
      columnState,
      comparisonState,
      valueState,
    };
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, newObject],
    });
  }

  return (
    <>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="search the name of the planet"
          onChange={ ({ target }) => {
            setInputName(target
              .value); setFilters({ ...filters, filterByName: { name: target.value } });
          } }
        />
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => setColumnState(target.value) }
        >
          {options.map((option) => <option key={ option }>{option}</option>)}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparisonState(target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ ({ target }) => setValueState(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filter
        </button>
      </form>
      <table>
        <caption>Planets</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {renderFilter().map((planet) => (
            <tr key={ planet.name }>
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
    </>
  );
}

export default Table;
