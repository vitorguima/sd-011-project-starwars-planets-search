import React from 'react';
import { usePlanets } from '../hooks/usePlanets';

function Table() {
  const { loading, planets, error } = usePlanets();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Algo deu errado...</p>;
  }

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
        { planets.map((p) => (
          <tr key={ p.name }>
            <td data-testid="planet-name">{ p.name }</td>
            <td>{ p.rotation_period }</td>
            <td>{ p.orbital_period }</td>
            <td>{ p.diameter }</td>
            <td>{ p.climate }</td>
            <td>{ p.gravity }</td>
            <td>{ p.terrain }</td>
            <td>{ p.surface_water }</td>
            <td>{ p.population }</td>
            <td>{ p.films }</td>
            <td>{ p.created }</td>
            <td>{ p.edited }</td>
            <td>{ p.url }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
