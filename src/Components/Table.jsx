import React from 'react';
import { GlobalContext } from '../GlobalContext';

const Table = () => {
  const { data, options, column, setColumn, comparison,
    setComparison, value, setValue } = React.useContext(GlobalContext);
  const [localValue, setLocalValue] = React.useState('');
  const [localColumn, setLocalColumn] = React.useState('population');
  const [localComparison, setLocalComparison] = React.useState('maior que');
  const [localNumberValue, setLocalNumberValue] = React.useState(0);
  const currentData = localValue
    ? data.filter((planet) => planet.name.toLowerCase().includes(localValue)) : data;
  const filterByMoreThan = data
    .filter((planet) => planet[column] > Number(value) || planet[column] === 'unknown');
  const filterByLessThan = data
    .filter((planet) => planet[column] < Number(value));
  const filterByEqual = data
    .filter((planet) => Number(planet[column]) === Number(value)
  || Number(planet[column]) === 'unknown');

  function renderMap() {
    if (localValue) {
      return currentData;
    }
    if (comparison === 'maior que') {
      return filterByMoreThan;
    }
    if (comparison === 'menor que') {
      return filterByLessThan;
    }
    if (comparison === 'igual a') {
      return filterByEqual;
    }
    return data;
  }

  function handleClick() {
    setColumn(localColumn);
    setComparison(localComparison);
    setValue(localNumberValue);
  }

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Nome do Planeta"
          onChange={ ({ target }) => setLocalValue(target.value) }
          data-testid="name-filter"
        />
        <select
          data-testid="column-filter"
          selected="population"
          onChange={ ({ target }) => setLocalColumn(target.value) }
        >
          {options.map((opt, i) => <option key={ i }>{opt}</option>)}
        </select>

        <select
          data-testid="comparison-filter"
          value="maior que"
          onChange={ ({ target }) => setLocalComparison(target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          onChange={ ({ target }) => setLocalNumberValue(target.value) }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Add filter
        </button>
      </form>
      <table>
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
          {renderMap().map((planet, i) => (
            <tr key={ i }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
