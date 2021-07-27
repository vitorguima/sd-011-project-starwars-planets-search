import React, { useContext } from 'react';
import PlanetContext from '../context/planetContext';

function Table() {
  const { planets, isLoading, keys, filters, setFilters } = useContext(PlanetContext);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (e) => setFilters({ filterByName: {
          name: e.target.value,
        } }) }
      />
      <table>
        <thead>
          <tr>
            {!isLoading && keys.map((key) => <th key={ key }>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {!isLoading && planets.results
            .filter((planet) => planet.name.includes(filters.filterByName.name))
            .map((planet, index) => (
              <tr key={ index }>
                {keys.map((key) => <td key={ key }>{planet[key]}</td>)}
              </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
