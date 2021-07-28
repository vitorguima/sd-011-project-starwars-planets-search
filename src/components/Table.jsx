import React, { useContext } from 'react';
import { Planet } from '../context/Planet';

export default function Table() {
  const { data, filters, planets } = useContext(Planet);

  if (data && planets) {
    const { name } = filters.filterByName;
    let planetsToBeRendered = data.results;
    if (name.length > 0) {
      planetsToBeRendered = planets;
    }

    const tableTitles = () => (
      Object.keys(planetsToBeRendered[0]).map((title, index) => (
        <th key={ index }>{ title }</th>
      ))
    );

    const tableContent = () => (
      planetsToBeRendered.map((planet, index) => (
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
