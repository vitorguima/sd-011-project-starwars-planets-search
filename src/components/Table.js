import React from 'react';
import GlobalContext from '../context/GlobalContext';
import FetchPlanets from '../services/api';

function Table() {
  const results = FetchPlanets();
  const { data, setData, filterName: { filters } } = React.useContext(GlobalContext);
  if (results) {
    results.map((e) => delete e.residents);
    setData(results);
  }
  let filter = [];
  if (filters.filterByName.name) {
    filter = data.filter((e) => e.name.toLowerCase().includes(filters.filterByName.name));
  } else {
    filter = data;
  }
  if (filters.filterByNumericValues[0].comparison === 'maior que') {
    filter = filter
      .filter((e) => Number(e[filters
        .filterByNumericValues[0].column]) > Number(filters
        .filterByNumericValues[0].value));
  }
  if (filters.filterByNumericValues[0].comparison === 'menor que') {
    filter = filter
      .filter((e) => Number(e[filters
        .filterByNumericValues[0].column]) <= Number(filters
        .filterByNumericValues[0].value));
  }
  if (filters.filterByNumericValues[0].comparison === 'igual a') {
    filter = filter
      .filter((e) => Number(e[filters
        .filterByNumericValues[0].column]) === Number(filters
        .filterByNumericValues[0].value));
  }

  return (
    <div>
      {filter.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(filter[0]).map((e, i) => (
                <th key={ i }>{e}</th>
              ))}
            </tr>

          </thead>
          <tbody>
            {filter.map((e, i) => (
              <tr key={ i }>
                <td>{e.name}</td>
                <td>{e.rotation_period}</td>
                <td>{e.orbital_period}</td>
                <td>{e.diameter}</td>
                <td>{e.climate}</td>
                <td>{e.gravity}</td>
                <td>{e.terrain}</td>
                <td>{e.surface_water}</td>
                <td>{e.population}</td>
                <td>{e.films}</td>
                <td>{e.created}</td>
                <td>{e.edited}</td>
                <td>{e.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default Table;
