import React, { useContext } from 'react';
import starwarsPlanetsContext from '../context/starwarsPlanetsContext';

function Table() {
  const { data } = useContext(starwarsPlanetsContext);

  const headers = Object.keys(data[0]);
  const residents = headers.indexOf('residents');
  headers.splice(residents, 1);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={ `header${index}` }>{header}</th>))}
        </tr>
      </thead>
      <tbody>
        { data.map((planet, index1) => (
          <tr key={ `${planet.name$}${index1}` }>
            { headers.map((header, index2) => (
              <td key={ `${planet.name}${index2}` }>{ planet[header] }</td>
            )) }
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
