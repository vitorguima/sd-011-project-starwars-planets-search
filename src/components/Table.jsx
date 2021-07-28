import React, { useContext } from 'react';
import { Planet } from '../context/Planet';

export default function Table() {
  const { data, planets } = useContext(Planet);

  if (data && planets) {
    const tableTitles = () => (
      Object.keys(planets[0]).map((title, index) => (
        <th key={ index }>{ title }</th>
      ))
    );

    const tableContent = () => (
      planets.map((planet, index) => (
        <tr key={ index }>
          { Object.values(planet).map((item, actualIndex) => (
            <td key={ actualIndex }>{ item }</td>)) }
        </tr>
      ))
    );

    if (planets.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              { tableTitles() }
            </tr>
          </thead>
          <tbody>
            { tableContent() }
          </tbody>
        </table>
      );
    }
    return (
      <p>Planeta não encontrado...</p>
    );
  }

  return (
    <p>Carregando...</p>
  );
}
