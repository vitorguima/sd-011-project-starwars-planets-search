import React from 'react';
import { GlobalContext } from '../GlobalContext';

const Table = () => {
  const { data, options, setOptions, column, setColumn, comparison,
    setComparison, value, setValue, filters, setFilters } = React
    .useContext(GlobalContext);
  const [localValue, setLocalValue] = React.useState('');
  const [localColumn, setLocalColumn] = React.useState('population');
  const [localComparison, setLocalComparison] = React.useState('maior que');
  const [localNumberValue, setLocalNumberValue] = React.useState(0);
  const currentData = localValue
    ? data.filter((planet) => planet.name.toLowerCase().includes(localValue)) : data;
  const filterByMoreThan = data
    .filter((planet) => planet[column] > Number(value));
  const filterByLessThan = data
    .filter((planet) => planet[column] < Number(value));
  const filterByEqual = data
    .filter((planet) => Number(planet[column]) === Number(value));

  function renderMap() {
    if (localValue) {
      console.log(comparison);
      console.log('Retornou currentData');
      return currentData;
    }
    if (comparison === 'maior que') {
      console.log(comparison);
      console.log('Retornou filterByMoreThan');
      return filterByMoreThan;
    }
    if (comparison === 'menor que') {
      console.log(comparison);
      console.log('Retornou filterByLessThan');
      return filterByLessThan;
    }
    if (comparison === 'igual a') {
      console.log(comparison);
      console.log('Retornou filterByEqual');
      return filterByEqual;
    }
    console.log(comparison);
    console.log('Retornou data');
    return data;
  }

  function handleClick() {
    setColumn(localColumn);
    setComparison(localComparison);
    setValue(localNumberValue);
    const objNumericFilter = {
      column: localColumn,
      comparison: localComparison,
      value: localNumberValue,
    };
    setFilters({ ...filters,
      filterByNumericValues:
      [...filters.filterByNumericValues, objNumericFilter] });
    setOptions(options.filter((option) => option !== localColumn));
  }

  function handleClickDelete(cln) {
    setComparison('');
    const newFilter = filters.filterByNumericValues.filter((item) => item.column !== cln);
    setFilters({ ...filters, filterByNumericValues: newFilter });
    setOptions([...options, cln]);
  }

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Nome do Planeta"
          onChange={ ({ target }) => {
            setLocalValue(target.value);
            setFilters({ filters: { filterByName: { name: target.value } } });
          } }
          data-testid="name-filter"
        />
        <select
          className="column"
          data-testid="column-filter"
          onChange={ ({ target }) => setLocalColumn(target.value) }
        >
          {options.map((opt, i) => (<option key={ i }>{opt}</option>))}
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
      {filters.filterByNumericValues && filters.filterByNumericValues.map((filter, i) => (
        <div key={ i } data-testid="filter">
          <p>{filter.column}</p>
          <button
            type="button"
            onClick={ () => handleClickDelete(filter.column) }
          >
            X
          </button>
        </div>
      ))}
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
