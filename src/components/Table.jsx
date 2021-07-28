import React, { useEffect, useState } from 'react';

function Table() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch('http://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((data) => data);
      setPlanets(results);
    };
    getPlanets();
  }, []);

  return (
    <table>
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
        <th>10</th>
        <th>11</th>
        <th>12</th>
        <th>13</th>
      </tr>
      <tbody>
        { planets.map((planet, index) => (
          <tr key={ index }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
          </tr>)) }
      </tbody>
    </table>
  );
}

export default Table;
