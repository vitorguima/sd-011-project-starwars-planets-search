import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TableContent() {
  const { toRender, objectKeys } = useContext(PlanetsContext);

  return (
    <table>
      <tbody>
        {toRender.map((planet, index) => (
          <tr key={ index }>
            {objectKeys.map((key, i) => <td key={ i }>{planet[key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableContent;
