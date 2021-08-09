import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';

function TableBody() {
  const {
    planets,
  } = useContext(AppContext);

  const remove = (element) => {
    element.map((data) => {
      delete data.residents;
      return data;
    });
    return element;
  };

  return (
    remove(planets).map((data, index) => (
      <tr key={ index }>
        <td>{data.name}</td>
        <td>{data.rotation_period}</td>
        <td>{data.orbital_period}</td>
        <td>{data.diameter}</td>
        <td>{data.climate}</td>
        <td>{data.gravity}</td>
        <td>{data.terrain}</td>
        <td>{data.surface_water}</td>
        <td>{data.population}</td>
        <td>{data.films}</td>
        <td>{data.created}</td>
        <td>{data.edited}</td>
        <td>{data.url}</td>
      </tr>
    ))
  );
}

export default TableBody;
