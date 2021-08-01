import React, { useContext } from 'react';
import starWarsContext from '../myContext/StarWarsContext';

export default function Table() {
  const { data, filteredPlanets } = useContext(starWarsContext);

  const columns = data[0] && Object.keys(data[0]).filter((curr) => curr !== 'residents');

  return (

    <table cellPadding={ 0 } cellSpacing={ 0 }>
      <thead>
        <tr>
          {data[0] && columns.map((heading, index) => <th key={ index }>{heading}</th>)}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((row, index) => (
          <tr key={ index }>
            {columns.map((column, id) => <td key={ id }>{row[column]}</td>)}
          </tr>))}
      </tbody>
    </table>
  );
}
