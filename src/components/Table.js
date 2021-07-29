import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

export default function Table() {
  const { planets } = useContext(AppContext);

  // Font: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
  const removeResidents = (planetsArr) => planetsArr.map((planet) => {
    delete planet.residents;
    return planet;
  });

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          { Object.keys(removeResidents(planets)[0]).map(
            (cell, index) => (<th key={ `${cell}${index}` }>{cell}</th>),
          ) }
        </tr>
      </thead>
      <tbody>
        {
          removeResidents(planets).map((planet, index) => (
            <tr key={ planet }>
              { Object.values(planet).map((value, innerIndex) => (
                <td key={ `${index}--${innerIndex}` }>{value}</td>
              )) }
            </tr>
          ))
        }
      </tbody>
    </table>
  );

  if (planets.length > 0) return renderTable();

  return (
    <h3>Loading...</h3>
  );
}
