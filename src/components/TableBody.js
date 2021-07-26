import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

export default function TableBody() {
  const { data } = useContext(TableContext);
  return (
    <tbody>
      { data.map((planet, key) => (
        <tr key={ key }>
          <td>{ planet.name }</td>
          <td>{ planet.rotation_period }</td>
          <td>{ planet.orbital_period }</td>
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
    </tbody>
  );
}
