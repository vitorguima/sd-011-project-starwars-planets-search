import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TableContent() {
  const { toRender, objectKeys, filters, setToRender, data } = useContext(PlanetsContext);

  useEffect(() => {
    const { filters: { inputText } } = filters;
    const filteredData = data.filter(
      (planet) => planet.name.toLowerCase().includes(inputText.toLowerCase()),
    );

    setToRender(filteredData);
  }, [filters, data, setToRender]);

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
