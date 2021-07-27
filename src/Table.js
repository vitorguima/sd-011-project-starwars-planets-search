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

  if (loading) return <p>loading...</p>;

  return (
    <main>
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
          {data && data.results.map((planeta, index) => (
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
