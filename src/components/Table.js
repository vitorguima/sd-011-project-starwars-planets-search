import React from 'react';
import GlobalContext from '../context/GlobalContext';
import FetchPlanets from '../services/api';

function Table() {
  const results = FetchPlanets();
  const { data, setData, filterName: { filters: {
    filterByName: {
      name,
    },
  } } } = React.useContext(GlobalContext);
  if (results) {
    results.map((e) => delete e.residents);
    setData(results);
  }
  let filter = [];
  if (name) {
    filter = data.filter((e) => e.name.toLowerCase().includes(name));
  } else {
    filter = data;
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
