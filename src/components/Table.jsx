import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/planetContext';

function Table() {
  const { planets, isLoading, keys, fetchPlanets } = useContext(PlanetContext);

  useEffect(fetchPlanets, []);

  const renderTable = (planet, index) => (
    <tr key={ index }>
      {keys.map((key) => <td key={ index }>{planet[key]}</td>)}
    </tr>
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {!isLoading && keys.map((key) => <td key={ key }>{key}</td>)}
          </tr>
        </thead>
        <tbody>
          {!isLoading && planets.results.map(renderTable)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
