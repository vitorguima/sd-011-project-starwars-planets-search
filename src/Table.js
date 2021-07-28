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

  function onClickTwoFunctions() {
    setFilter({ filters: {
      filterByName: { ...filter.filters.filterByName },
      filterByNumericValues: [...filter.filters.filterByNumericValues,
        { column, comparison, value }],
    } });
    onClickFilter();
  }

  const [columnArray, setColumnArray] = React.useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const comparisonArray = [
    'maior que',
    'menor que',
    'igual a',
  ];

  React.useEffect(() => {
    if (filter.filters.filterByNumericValues.length > 0) {
      setColumnArray(columnArray.filter(
        (colum) => colum !== filter.filters.filterByNumericValues[0].column,
      ));
    }
  }, [filter.filters.filterByNumericValues]);

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
        {columnArray.map((colum, index) => (
          <option key={ index } value={ colum }>{ colum }</option>
        ))}
      </select>
      <select
        value={ comparison }
        name="comparison-filter"
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
      >
        {comparisonArray.map((comparacao, index) => (
          <option key={ index } value={ comparacao }>{ comparacao }</option>
        ))}
      </select>
      <input
        value={ value }
        data-testid="value-filter"
        type="number"
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        onClick={ onClickTwoFunctions }
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
