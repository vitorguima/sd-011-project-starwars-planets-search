import React, { useContext } from 'react';
import StarContext from '../context/StarContext';
import Filter from './Filter';
import { sortByName, sortByValues } from './Sort';

function Table() {
  const {
    data,
    filters: {
      filterByName: { name: nameFilter },
      filterByValue,
      order,
    },
  } = useContext(StarContext);

  const filterFromContext = (planet) => {
    if (filterByValue.length === 0) return planet;
    const { column, comparison, value } = filterByValue[filterByValue.length - 1];
    const comparisonValue = parseFloat(planet[column]);
    switch (comparison) {
    case 'maior que':
      return comparisonValue > value;

    case 'menor que':
      return comparisonValue < value;

    case 'igual a':
      return comparisonValue === value;

    default:
      return planet;
    }
  };

  if (Object.keys(order)) {
    data.sort((a, b) => {
      const { column } = order;
      if (column === 'name') return sortByName(a, b, order);
      return sortByValues(a, b, order);
    });
  }

  return (
    <section>
      <Filter />
      <table className="planetas">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Período de Rotação</th>
            <th>Período Orbital</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Água Superfície</th>
            <th>População</th>
            <th>Filmes</th>
            <th>Criação</th>
            <th>Edição</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0
            && data
              .filter((planet) => (nameFilter
                ? planet.name.includes(nameFilter)
                : planet))
              .filter((planet) => filterFromContext(planet))
              .map(
                ({
                  name,
                  rotation_period: rotationPeriod,
                  orbital_period: orbitalPeriod,
                  diameter,
                  climate,
                  gravity,
                  terrain,
                  surface_water: surfaceWater,
                  population,
                  films,
                  created,
                  edited,
                  url,
                }) => (
                  <tr key={ name }>
                    <td data-testid="planet-name">{name}</td>
                    <td>{rotationPeriod}</td>
                    <td>{orbitalPeriod}</td>
                    <td>{diameter}</td>
                    <td>{climate}</td>
                    <td>{gravity}</td>
                    <td>{terrain}</td>
                    <td>{surfaceWater}</td>
                    <td>{population}</td>
                    <td>{films}</td>
                    <td>{created}</td>
                    <td>{edited}</td>
                    <td>{url}</td>
                  </tr>
                ),
              )}
        </tbody>
      </table>
    </section>);
}

export default Table;
