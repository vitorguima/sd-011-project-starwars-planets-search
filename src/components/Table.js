import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import PlanetsContext from '../context/PlanetsContext';
// articles https://edrodrigues.com.br/blog/criando-tabelas-com-filtros-%E2%80%8B%E2%80%8Busando-react/#:~:text=Criando%20Uma%20Tabela%20Com%20O,listando%20uma%20linha%20por%20produto.&text=Aqui%2C%20aceitamos%20uma%20variedade%20de,em%20loop%20em%20nossa%20tabela.
// Agradecimentos especiais à Carol, Islene, Leonardo

export default function Table() {
  // as infos do fetch serão transmitidas para a table pelo contexto. UseContext recebe como param. o contexto usado.
  // os dados - data- usados no map da tabela vem lá do fetch que está no provider que, por sua vez é acessado pelo context.
  // Ainda não passamos o setData, pq, no momento -requ. 1- , a função não será necessária. useContext funciona com 1 argumento.
  const { data } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Edited</th>
          <th>Created</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {data.map((planets, index) => (
          <tr key={ index }>
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
            <td>{planets.edited}</td>
            <td>{planets.created}</td>
            <td>{planets.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
