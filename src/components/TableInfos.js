import React from 'react';
import PropTypes from 'prop-types';
import { planetInfos } from '../data/data';

function TableInfos({ arrayOfPlanets, column, sort }) {
  if (!arrayOfPlanets.length) return <p>Nenhum planeta encontrado</p>;

  const theads = Object.keys(arrayOfPlanets[0]).filter(
    (planetInfo) => planetInfo !== 'residents',
  );

  arrayOfPlanets.sort((planetA, planetB) => {
    if (sort === 'ASC' && /^[0-9]/.test(planetA[column])) {
      return Number(planetA[column]) - Number(planetB[column]);
    }

    if (sort === 'ASC') {
      return planetA[column].charCodeAt() - planetB[column].charCodeAt();
    }

    if (sort === 'DESC' && /^[0-9]/.test(planetA[column])) {
      return Number(planetB[column]) - Number(planetA[column]);
    }

    return planetB[column].charCodeAt() - planetA[column].charCodeAt();
  });

  return (
    <table>
      <thead>
        <tr>
          {theads.map((value, index) => (
            <th key={ index }>{value}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {arrayOfPlanets.map((planet, index) => (
          <tr key={ index }>
            <td data-testid="planet-name">{planet.name}</td>
            {planetInfos.map((info, idx) => (
              <td key={ idx }>{planet[info]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableInfos;

TableInfos.propTypes = {
  arrayOfPlanets: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
};
