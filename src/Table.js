import React from 'react';
import { GlobalContext } from './context/GlobalContext';

function Table() {
  const { loading, data, request } = React.useContext(GlobalContext);

  React.useEffect(() => {
    function fetchData() {
      request('https://swapi-trybe.herokuapp.com/api/planets/');
    }
    fetchData();
  }, [request]);

  const [filter, setFilter] = React.useState(
    { filters: { filterByName: { name: '' }, filterByNumericValues: [] } },
  );

  const [filtered, setFiltered] = React.useState([]);
  const [column, setColumn] = React.useState('population');
  const [comparison, setComparison] = React.useState('maior que');
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setFiltered(data && data.results.filter(
      (planeta) => planeta.name.toLowerCase().includes(
        filter.filters.filterByName.name.toLowerCase(),
      ),
    ));
  }, [data, filter.filters.filterByName.name]);

  function onClickFilter() {
    switch (comparison) {
    case 'maior que':
      return setFiltered(filtered.filter(
        (planeta) => Number(planeta[column]) > Number(value),
      ));
    case 'menor que':
      return setFiltered(filtered.filter(
        (planeta) => Number(planeta[column]) < Number(value),
      ));
    case 'igual a':
      return setFiltered(filtered.filter(
        (planeta) => Number(planeta[column]) === Number(value),
      ));
    default:
      return true;
    }
  }

  if (loading) return <p>loading...</p>;

  return (
    <main>
      <input
        type="text"
        value={ filter.filters.filterByName.name }
        data-testid="name-filter"
        onChange={ ({ target }) => setFilter(
          { filters: { filterByName:
            { name: target.value },
          filterByNumericValues: [] } },
        ) }
      />
      <select
        value={ column }
        name="column-filter"
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        value={ comparison }
        name="comparison-filter"
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        value={ value }
        data-testid="value-filter"
        type="number"
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        onClick={ onClickFilter }
        data-testid="button-filter"
        type="button"
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {filtered && filtered.map((planeta, index) => (
            <tr key={ index }>
              <td>{ planeta.name }</td>
              <td>{ planeta.rotation_period }</td>
              <td>{ planeta.orbital_period }</td>
              <td>{ planeta.diameter }</td>
              <td>{ planeta.climate }</td>
              <td>{ planeta.gravity }</td>
              <td>{ planeta.terrain }</td>
              <td>{ planeta.surface_water }</td>
              <td>{ planeta.population }</td>
              <td>{ planeta.films }</td>
              <td>{ planeta.created }</td>
              <td>{ planeta.edited }</td>
              <td>{ planeta.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
