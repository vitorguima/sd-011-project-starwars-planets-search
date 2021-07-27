import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  // block for setting the state of the component
  const data = useContext(PlanetsContext);

  const [planets, setPlanets] = useState({
    planets: [],
  });

  const [filters, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    } });

  const [filterHandler, setFilterHandler] = useState({
    column: '',
    comparison: '',
    value: 0,
  });

  const [colunmSelector, setColunmSelectors] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );

  // useEffect to prevent crashes when the component re-renderizes - sets the Api result in the state;
  useEffect(() => {
    if (data) {
      setPlanets(data.filter((item) => item.name.toLowerCase()
        .includes(filters.filters.filterByName.name)));
    }
  }, [data, filters]);

  if (!data) {
    return (
      <h1>Loading</h1>
    );
  }
  // get keys & filter residents off
  const objectKeys = Object.keys(data[0]).filter((value) => value !== 'residents');

  // manage values of search input text
  const handleSearchInputValue = ({ target }) => {
    const { value: inputValue } = target;
    setFilters({
      filters: {
        filterByName: {
          name: inputValue,
        },
      },
    });
  };

  // manage values of filter inputs
  const handleFilterInputs = ({ target }) => {
    const { name, value } = target;
    setFilterHandler(({
      ...filterHandler,
      [name]: value,
    }));
  };

  // filter planets using selected filters

  const filteredPlanets = Object.values(planets).filter((planet) => {
    switch (filterHandler.comparison) {
    case 'maior que':
      return planet[filterHandler.column] > Number(filterHandler.value);
    case 'menor que':
      return planet[filterHandler.column] < Number(filterHandler.value);
    case 'igual a':
      return planet[filterHandler.column] === filterHandler.value;
    default:
      return planet;
    }
  });
  // button handler && column filter (prevents filter repeat)

  const buttonHandler = () => {
    const { column, comparison, value } = filterHandler;
    setFilters({ filters: { ...filters.filters,
      filterByNumericValues:
      [...filters.filters.filterByNumericValues, { column, comparison, value }] } });
    setColunmSelectors(colunmSelector.filter((item) => item !== filterHandler.column));
  };

  return (
    <div>
      <label htmlFor="search">
        Search by name:
        {' '}
        <input
          name="search"
          data-testid="name-filter"
          onChange={ (e) => handleSearchInputValue(e) }
        />
      </label>
      <form>
        <label htmlFor="column">
          Filter by:
          <select
            name="column"
            data-testid="column-filter"
            onChange={ (e) => handleFilterInputs(e) }
          >
            {/* <option value="" defaultValue>Select your option</option> */}
            { colunmSelector.map((column) => (
              <option key={ column } value={ column }>{ column }</option>
            )) }
          </select>
        </label>
        <label htmlFor="comparison">
          Compare by:
          <select
            name="comparison"
            data-testid="comparison-filter"
            onChange={ (e) => handleFilterInputs(e) }
          >
            <option value="" defaultValue>Select your option</option>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          Value:
          <input
            type="number"
            name="value"
            data-testid="value-filter"
            onChange={ (e) => handleFilterInputs(e) }
          />
        </label>
        <button
          type="button"
          name="add-filter"
          data-testid="button-filter"
          onClick={ buttonHandler }
        >
          {' '}
          Add Filter
        </button>
      </form>
      <table>
        <thead>
          <tr>
            {objectKeys.map((item, index) => (<th key={ index }>{item}</th>))}
          </tr>
        </thead>
        <tbody>
          {Object.values(filteredPlanets).map((item, index) => (
            <tr key={ index }>
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
