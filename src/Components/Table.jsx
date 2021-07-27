import React, { useEffect, useState } from 'react';

function Table() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const data = await fetch(endpoint).then((datas) => datas.json());
      setPlanets(data.results);
      console.log(data.results);
    };
    getPlanets();
  }, []);

  return (
    <table border="1px" cellPadding="5px" cellSpacing="0">
      <thead>
        <tr className="tabletr">
          <th>Nome</th>
          <th>Clima</th>
          <th>Criação</th>
          <th>Diametro</th>
          <th>Editado</th>
          <th>Gravidade</th>
          <th>Periodo orbital</th>
          <th>População</th>
          <th>Periodo de rotação</th>
          <th>Supérficie com agua</th>
          <th>Terreno</th>
          <th>Filmes</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          planets.map(({
            name,
            climate,
            created,
            diameter,
            edited,
            gravity,
            orbital_period: orbitalPeriod,
            population,
            rotation_period: rotationPeriod,
            surface_water: surfaceWater,
            terrain,
            films,
            url,
          }) => (
            <tr key={ name } id={ name }>
              <td className="planet">{name}</td>
              <td className="planet">{climate}</td>
              <td className="planet">{created}</td>
              <td className="planet">{diameter}</td>
              <td className="planet">{edited}</td>
              <td className="planet">{gravity}</td>
              <td className="planet">{orbitalPeriod}</td>
              <td className="planet">{population}</td>
              <td className="planet">{rotationPeriod}</td>
              <td className="planet">{surfaceWater}</td>
              <td className="planet">{terrain}</td>
              <td className="planet">{films}</td>
              <td className="planet">{url}</td>
            </tr>))
        }
      </tbody>
    </table>
  );
}
export default Table;
