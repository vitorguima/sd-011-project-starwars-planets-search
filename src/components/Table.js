import React, { useContext } from 'react';
import starWarsContext from '../myContext/StarWarsContext';

function Table() {
  const { data } = useContext(starWarsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Período de Rotação</th>
          <th>Período de Órbita</th>
          <th>Diâmetro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Água na Superfície</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {data.map((res, index) => (
          <tr key={ index }>
            <td>{res.name}</td>
            <td>{res.rotation_period}</td>
            <td>{res.orbital_period}</td>
            <td>{res.diameter}</td>
            <td>{res.climate}</td>
            <td>{res.gravity}</td>
            <td>{res.terrain}</td>
            <td>{res.surface_water}</td>
            <td>{res.population}</td>
            <td>{res.films}</td>
            <td>{res.created}</td>
            <td>{res.edited}</td>
            <td>{res.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
