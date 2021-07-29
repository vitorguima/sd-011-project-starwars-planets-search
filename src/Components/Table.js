import React, { useContext } from 'react';
import planetContext from '../Context/PlanetContext';
import { columnTitles } from '../Context/PlanetProvider';

function Table() {
  const { isloading, data } = useContext(planetContext);
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
              {data.map((planet, index) => (
                <tr key={index}>
                  {Object.values(planet).map((planetData, dataIndex) => (
                    <td key={ dataIndex }>
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
