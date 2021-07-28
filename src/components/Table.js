import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

export default function Table() {
  const {
    data,
    filters,
    setFilters,
    filterNumericValues,
    setFilterNumericValues,
  } = useContext(TableContext);

  const handleNameChange = ({ target }) => {
    setFilters({
      filters: {
        filterByName: {
          name: target.value,
        },
        filterByNumericValues: [
          ...filters.filters.filterByNumericValues,
        ],
      },
    });
  };

  if (!data.results) {
    return (
      <p>Loading...</p>
    );
  }

  const setUserFilters = () => {
    const { column, comparison, value } = filterNumericValues;
    setFilters({ filters: { ...filters.filters,
      filterByNumericValues:
      [filters.filters.filterByNumericValues, { column, comparison, value }] } });
  };

  const setColumn = ({ target }) => {
    setFilterNumericValues({

      ...filterNumericValues,
      column: target.value,
    });
  };

  const setComparison = ({ target }) => {
    console.log(target.value);
    setFilterNumericValues({

      ...filterNumericValues,
      comparison: target.value,
    });
  };

  const setPopulation = ({ target }) => {
    console.log(target.value);
    setFilterNumericValues({

      ...filterNumericValues,
      value: target.value,
    });
  };

  const searchPlanetsByName = data.results.filter((planets) => (
    planets.name.toLowerCase().includes(filters.filters.filterByName.name)));

  const filterPlanets = searchPlanetsByName.filter((value) => {
    if (filters.filters.filterByNumericValues.length > 0) {
      const values = filters.filters
        .filterByNumericValues[filters.filters.filterByNumericValues.length - 1];
      switch (values.comparison) {
      case 'maior que':
        return value[values.column] > Number(values.value);
      case 'menor que':
        return value[values.column] < Number(values.value);
      case 'igual a':
        return value[values.column] === values.value;
      default:
        return true;
      }
    } return true;
  });

  return (
    <div>
      <header>
        <input
          type="text"
          data-testid="name-filter"
          value={ filters.filters.filterByName.name }
          onChange={ handleNameChange }
          placeholder="Search by Name"
        />
        <select
          data-testid="column-filter"
          name="column"
          onChange={ setColumn }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ setComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          data-testid="value-filter"
          type="number"
          value={ filters.filters.filterByNumericValues.value }
          name="value"
          onChange={ setPopulation }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ setUserFilters }
        >
          Filtrar
        </button>

      </header>
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
          {filterPlanets.map((planet) => (
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
    </div>
  );
}
