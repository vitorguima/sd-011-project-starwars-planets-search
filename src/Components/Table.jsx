import React, { useContext } from 'react';
import Context from '../Context/Context';

export default function Table() {
  const { data } = useContext(Context);
  console.log(data)
  return (
    <>
      <h1>In the Table</h1>
      <thead>
        <tr>
          <th>Name</th>
          <th>Período de Rotação</th>
          <th>Período Orbital</th>
          <th>Diametro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Água na Superfície</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>url</th>
        </tr>
      </thead>

      <tbody>
        {data.map((planets) => (
          <tr key={ planets.name }>
            <td>{planets.name}</td>
            <td>{planets.rotation_period}</td>
            <td>{planets.orbital_period}</td>
            <td>{planets.diameter}</td>
            <td>{planets.climate}</td>
            <td>{planets.gravity}</td>
            <td>{planets.terrain}</td>
            <td>{planets.surface_water}</td>
            <td>{planets.population}</td>
            <td>{planets.films}</td>
            <td>{planets.created}</td>
            <td>{planets.edited}</td>
            <td>{planets.url}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
