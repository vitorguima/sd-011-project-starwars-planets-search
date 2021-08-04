import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TableHeader() {
  const { objectKeys } = useContext(PlanetsContext);

  return (
    <table>
      <tbody>
        <tr>
          {objectKeys.map((key, index) => <th key={ index }>{key}</th>)}
        </tr>
      </tbody>
    </table>
  );
}

export default TableHeader;
