import React from 'react';
import Context from '../context/Context';

function Table() {
  return (
    <Context.Consumer>
      {( data ) => (
        <table>
          <tr>
            <th>Nome</th>
            <th>Período de Rotação</th>
            <th>Período Orbital</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Água da Superfície</th>
            <th>População</th>
            <th>Filmes</th>
            <th>Criado</th>
            <th>Editado</th>
            <th>URL</th>
          </tr>
        </table>
      )}
    </Context.Consumer>
  );
}

export default Table;
