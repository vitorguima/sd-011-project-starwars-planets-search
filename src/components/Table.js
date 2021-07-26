import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

export default function Table() {
  const [filterState, setFilterState] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });
  const [filterNumeric, setFilterNumeric] = useState({
    column: '',
    comparison: '',
    value: 0,
  });
  const [filteredPlanets, setFilteredPlanets] = useState(null);
  const { data } = useContext(Context);

  useEffect(() => {
    setFilteredPlanets(data.filter((planet) => planet.name
      .includes(filterState.filters.filterByName.name)));
  }, [data, filterState.filters.filterByName]);

  useEffect(() => {
    const { filters } = filterState;
    const { filterByNumericValues } = filters;
    // console.log(filterByNumericValues.length - 1);
    const teste = filterByNumericValues[filterByNumericValues.length - 1] || '';
    switch (teste.comparison) {
    case 'maior que':
      setFilteredPlanets(data
        .filter((planet) => Number(planet[teste.column]) > Number(teste.value)));
      break;
    case 'menor que':
      setFilteredPlanets(data
        .filter((planet) => Number(planet[teste.column]) < Number(teste.value)));
      break;
    case 'igual a':
      setFilteredPlanets(data
        .filter((planet) => Number(planet[teste.column]) === Number(teste.value)));
      break;
    default:
      break;
    }
  }, [filterState.filters.filterByNumericValues]);

  if (!data[0]) {
    return (<p>Carregando...</p>);
  }
  const filteredValues = Object.keys(data[0]).filter((value) => value !== 'residents');

  const searchNumeric = () => {
    const filterP = filteredPlanets.filter((value) => (
      value[filterNumeric.column] > filterNumeric.value));
    setFilteredPlanets(filterP);
    setFilterState({
      ...filterState,
      filters: {
        ...filterState.filters,
        filterByNumericValues: [...filterState.filters.filterByNumericValues,
          filterNumeric],
      },
    });
    setFilterNumeric({
      column: '',
      comparison: '',
      value: '',
    });
  };

  return (
    <div>
      <label htmlFor="filterPlanets">
        <input
          id="filterPlanets"
          type="text"
          name="name"
          data-testid="name-filter"
          onChange={ (({ target }) => setFilterState({
            filters: {
              ...filterState.filters,
              filterByName: {
                name: target.value,
              },
            },
          })) }
        />
      </label>
      <select
        data-testid="column-filter"
        value={ filterNumeric.column }
        onChange={ (({ target }) => setFilterNumeric(
          { ...filterNumeric,
            column: target.value,
          },
        )) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ filterNumeric.comparison }
        onChange={ (({ target }) => setFilterNumeric(
          { ...filterNumeric,
            comparison: target.value,
          },
        )) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <label htmlFor="valueFilter">
        <input
          type="number"
          id="valueFilter"
          data-testid="value-filter"
          value={ filterNumeric.value }
          onChange={ (({ target }) => setFilterNumeric(
            { ...filterNumeric,
              value: target.value,
            },
          )) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ searchNumeric }
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            {filteredValues.map((value, index) => (<th key={ index }>{value}</th>))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet, index) => (
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
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

Table.ThemeContext = Context;
