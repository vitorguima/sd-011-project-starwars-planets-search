import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function MainPage() {
  const { filteredPlanets,
    filters,
    handleFilterByName,
    onClickButtonNumericValues,
    removeFromFilterByNumericValue,
    onClickButtonSort,
  } = useContext(StarWarsContext);

  const initalColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const initialNumericForm = { column: 'population', comparison: 'maior que', value: 0 };
  const initialSortColumns = { columnSort: 'name', sort: 'ASC' };
  const [numericForm, setNumericForm] = useState(initialNumericForm);
  const [optionsColumn, setOptionsColumn] = useState(initalColumns);
  const [sortColumns, setSortColumns] = useState(initialSortColumns);

  function handleFilterByNumericValues({ target: { name, value } }) {
    setNumericForm({ ...numericForm, [name]: value });
  }

  function handleSortOnChange({ target: { name, value } }) {
    setSortColumns({ ...sortColumns, [name]: value });
  }

  useEffect(() => {
    const { filterByNumericValues } = filters;
    let filteringColumns = [...initalColumns];

    if (filterByNumericValues.length > 0) {
      let tempFilteringColumns = [...filteringColumns];
      filterByNumericValues.forEach((filter) => {
        tempFilteringColumns = ([...filteringColumns.filter((column) => (
          column !== filter.column))]);
        filteringColumns = tempFilteringColumns;
      });
    }
    setOptionsColumn(filteringColumns);
    setNumericForm({ column: filteringColumns[0], comparison: 'maior que', value: 0 });
  }, [filters]);

  const planetLine = (planet) => {
    const {
      name,
      rotation_period: rotationalPeriod,
      orbital_period: orbitalPeriod,
      diameter,
      climate,
      terrain,
      gravity,
      surface_water: surfaceWater,
      population,
      residents,
      films,
      created,
      edited,
    } = planet;
    return (
      <tr key={ name }>
        <td data-testid="planet-name">{name}</td>
        <td>{rotationalPeriod}</td>
        <td>{orbitalPeriod}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{terrain}</td>
        <td>{gravity}</td>
        <td>{surfaceWater}</td>
        <td>{population}</td>
        <td>
          {residents.map((resident) => <a key={ resident } href={ resident }>Link</a>)}
        </td>
        <td>{films.map((film) => <a key={ film } href={ film }>Link</a>)}</td>
        <td>{created}</td>
        <td>{edited}</td>
      </tr>
    );
  };

  const comparisons = ['maior que', 'menor que', 'igual a'];
  const { column, comparison, value } = numericForm;
  const { filterByNumericValues } = filters;
  const { columnSort, sort } = sortColumns;
  const listSort = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'terrain',
    'gravity',
    'surface_water',
    'population',
  ];

  return (
    <div>
      <div>
        <form>
          <label htmlFor="name-filter">
            <input
              type="text"
              name="name-filter"
              onChange={ handleFilterByName }
              data-testid="name-filter"
            />
          </label>
        </form>
        <form>
          <label htmlFor="column">
            <select
              name="column"
              onChange={ handleFilterByNumericValues }
              data-testid="column-filter"
              value={ column }
            >
              { optionsColumn.map((item) => (
                <option key={ item } value={ item }>{ item }</option>
              ))}
            </select>
          </label>
          <label htmlFor="comparison">
            <select
              name="comparison"
              onChange={ handleFilterByNumericValues }
              data-testid="comparison-filter"
              value={ comparison }
            >
              { comparisons.map((item) => (
                <option key={ item } value={ item }>{ item }</option>
              ))}
            </select>
          </label>
          <label htmlFor="value">
            <input
              type="number"
              name="value"
              onChange={ handleFilterByNumericValues }
              data-testid="value-filter"
              value={ value }
            />
          </label>
          <button
            data-testid="button-filter"
            type="button"
            onClick={ () => {
              onClickButtonNumericValues(column, comparison, value);
            } }
          >
            Filter
          </button>
        </form>

        <form>
          <label htmlFor="columnSort">
            <select
              name="columnSort"
              onChange={ handleSortOnChange }
              data-testid="column-sort"
              value={ columnSort }
            >
              { listSort.map((item) => (
                <option key={ item } value={ item }>{ item }</option>
              ))}
            </select>
          </label>
          <label htmlFor="sort">
            <input
              data-testid="column-sort-input-desc"
              type="radio"
              name="sort"
              value="DESC"
              onChange={ handleSortOnChange }
            />
            Decrescente
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              name="sort"
              value="ASC"
              onChange={ handleSortOnChange }
            />
            Crescente
          </label>
          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ () => onClickButtonSort(columnSort, sort) }
          >
            Ordenar
          </button>
        </form>

        { filterByNumericValues.length > 0 && filterByNumericValues.map((item) => (
          <div data-testid="filter" key={ item.column }>
            <span>{item.column}</span>
            <button
              type="button"
              onClick={ () => removeFromFilterByNumericValue(item) }
            >
              X
            </button>
          </div>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotational Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Terrain</th>
            <th>Gravity</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Residents</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
          </tr>
        </thead>
        <tbody>
          { filteredPlanets.length > 0 && filteredPlanets.map((planet) => (
            planetLine(planet)
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainPage;
