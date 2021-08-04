import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { dataFromApi, planetsFilter, loading, getPlanets } = useContext(StarWarsContext);
  const { planets: { results } } = dataFromApi;
  const { filteredPlanets } = planetsFilter;

  useEffect(() => {
    getPlanets();
  });

  const createPlanetsTable = (data = results) => {
    if (filteredPlanets.length) { data = filteredPlanets; }

    return (
      <table cellSpacing="0">
        <thead>
          <tr>
            {Object.keys(data[0])
              .map((header, index) => (
                <th key={ index }>
                  { header }
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {data.map((result, index) => (
            <tr key={ index }>
              {Object.values(result)
                .map((planet, position) => (
                  <td key={ position }>
                    { planet }
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    createPlanetsTable()
  );
}

export default Table;
