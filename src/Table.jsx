import React from 'react';
import { usePlanets } from './usePlanets';

function Table() {
  const { loading, apiResponse, error } = usePlanets();
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Algo deu errado...</p>;
  }

  const { results } = apiResponse;

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Período de Rotação</th>
          <th scope="col">Período de Órbita</th>
          <th scope="col">Diâmetro</th>
          <th scope="col">Clima</th>
          <th scope="col">Gravidade</th>
          <th scope="col">Terreno</th>
          <th scope="col">Água na Superfície</th>
          <th scope="col">População</th>
          <th scope="col">Filmes</th>
          <th scope="col">Criado</th>
          <th scope="col">Editado</th>
          <th scope="col">Url</th>
        </tr>
      </thead>
      <tbody>
        { results.map((r) => (
          <tr key={ r.name }>
            <td>{ r.name }</td>
            <td>{ r.rotation_period }</td>
            <td>{ r.orbital_period }</td>
            <td>{ r.diameter }</td>
            <td>{ r.climate }</td>
            <td>{ r.gravity }</td>
            <td>{ r.terrain }</td>
            <td>{ r.surface_water }</td>
            <td>{ r.population }</td>
            <td>{ r.films }</td>
            <td>{ r.created }</td>
            <td>{ r.edited }</td>
            <td>{ r.url }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
