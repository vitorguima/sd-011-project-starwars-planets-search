import React, { useContext } from 'react';
import planetContext from '../Context/PlanetContext';
import { columnTitles } from '../Context/PlanetProvider';

function Table() {
  const { isloading, filteredPlanets } = useContext(planetContext);
  const dataTestMarks = ['name', 'rotation-period', 'orbital-period', 'diameter',
    'climate', 'gravity', 'terrain', 'surface-water', 'population', 'films',
    'created', 'edited', 'url'];
  return (
    <div>
      {
        isloading
          ? <h1>Carregando</h1>
          : (
            <table>
              <tr>
                {columnTitles.map((column, index) => (
                  <th key={ index }>
                    {column}
                  </th>
                ))}
              </tr>
              {filteredPlanets.map((planet, index) => (
                <tr key={ index }>
                  {Object.values(planet).map((planetData, dataIndex) => (
                    <td
                      data-testid={ `planet-${dataTestMarks[dataIndex]}` }
                      key={ dataIndex }
                    >
                      {planetData}
                    </td>
                  ))}
                </tr>
              ))}
            </table>
          )
      }
    </div>
  );
}

export default Table;
