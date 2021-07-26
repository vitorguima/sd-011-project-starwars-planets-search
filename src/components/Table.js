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
  const [column, setColumn] = useState([]);
  const [filterNumeric, setFilterNumeric] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filteredPlanets, setFilteredPlanets] = useState(null);
  const { data } = useContext(Context);

  useEffect(() => {
    setColumn([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]);
  }, []);

  useEffect(() => {
    setFilteredPlanets(data.filter((planet) => planet.name
      .includes(filterState.filters.filterByName.name)));
  }, [data, filterState.filters.filterByName]);

  const functionFilterPlanets = () => {
    const { filters } = filterState;
    const { filterByNumericValues } = filters;
    console.log(filteredPlanets);
    setFilteredPlanets(data.filter((planet) => planet.name
      .includes(filterState.filters.filterByName.name)));
    for (let index = 0; index < filterByNumericValues.length; index += 1) {
      const fill = filterByNumericValues[index];

      console.log(fill.comparison);
      console.log(fill.column);
      console.log(fill.value);
      console.log(filteredPlanets[index]);

      switch (fill.comparison) {
      case 'maior que':
        setFilteredPlanets(filteredPlanets
          .filter((planet) => Number(planet[fill.column]) > Number(fill.value)));
        console.log(filteredPlanets);
        break;
      case 'menor que':
        setFilteredPlanets(filteredPlanets
          .filter((planet) => Number(planet[fill.column]) < Number(fill.value)));
        break;
      case 'igual a':
        setFilteredPlanets(filteredPlanets
          .filter((planet) => Number(planet[fill.column]) === Number(fill.value)));
        break;
      default:
        break;
      }
    }
  };

  useEffect(() => {
    functionFilterPlanets();
  }, [filterState.filters.filterByNumericValues]);

  if (!data[0]) {
    return (<p>Carregando...</p>);
  }
  const filteredValues = Object.keys(data[0]).filter((value) => value !== 'residents');

  const searchNumeric = () => {
    setFilterState({
      ...filterState,
      filters: {
        ...filterState.filters,
        filterByNumericValues: [...filterState.filters.filterByNumericValues,
          filterNumeric],
      },
    });
    setColumn(column.filter((value) => value !== filterNumeric.column));
    setFilterNumeric({
      column: column[0],
      comparison: 'maior que',
      value: 0,
    });
  };

  const deleteFilter = (selected) => {
    setColumn([...column, filterState.filters.filterByNumericValues[selected].column]);
    setFilterState({
      filters: {
        ...filterState.filters,
        filterByNumericValues: [...filterState.filters.filterByNumericValues
          .filter((_, index) => index !== selected)],
      },
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
        { column.map((value, index) => (
          <option value={ value } key={ index }>
            {value}
          </option>
        )) }
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
      { filterState.filters.filterByNumericValues.map((value, index) => (
        <p key={ index } data-testid="filter">
          <span>{value.column}</span>
          <span>{value.comparison}</span>
          <span>{value.value}</span>
          <button
            type="button"
            onClick={ () => deleteFilter(index) }
          >
            X
          </button>
        </p>
      )) }
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
