import React from 'react';

import { useTable } from '../contexts/TableContext';

export default function Table() {
  const { filteredData } = useTable();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Período de rotação</th>
            <th>Período de órbita</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Água de superfície</th>
            <th>População</th>
            <th>Filmes</th>
            <th>Criado</th>
            <th>Editado</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { filteredData.length === 0
            ? <tr><td>Carregando...</td></tr>
            : filteredData.map((item, index) => (
              <tr key={ index }>
                <td>{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            )) }
        </tbody>
      </table>
    </div>
  );
}
