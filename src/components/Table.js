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
  const { comparison, column, value } = filters.filterByNumericValues[0];

  if (comparison === 'maior que' && value !== 0) {
    filter = filter
      .filter((e) => Number(e[column]) > Number(value));
  }
  if (comparison === 'menor que' && value !== 0) {
    filter = filter
      .filter((e) => Number(e[column]) < Number(value));
  }
  if (comparison === 'igual a' && value !== 0) {
    filter = filter
      .filter((e) => Number(e[column]) === Number(value));
  }

  return (
    <div>
      {data.length > 0 ? (
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
