import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function Table() {
  const { newdata, loading } = useContext(MyContext);
  const valueArray = Object.keys(newdata[0]);
  const planets = newdata;
  if (loading) return <h1>carregando...</h1>;

  return (
    <table>
      <tr>
        {valueArray.map((value, index) => <th key={ index }>{value}</th>)}
      </tr>

      {planets.map((planet, index) => (
        <tr key={ index }>
          <td>{ planet.name }</td>
          <td>{ planet.orbital_period }</td>
          <td>{ planet.rotation_period }</td>
          <td>{ planet.diameter }</td>
          <td>{ planet.climate }</td>
          <td>{ planet.gravity }</td>
          <td>{ planet.terrain }</td>
          <td>{ planet.surface_water }</td>
          <td>{ planet.population }</td>
          <td>{ planet.films }</td>
          <td>{ planet.created }</td>
          <td>{ planet.edited }</td>
          <td>{ planet.url }</td>
        </tr>
      ))}
    </table>
  );
}

export default Table;
