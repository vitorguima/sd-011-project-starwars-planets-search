import React, { useContext } from 'react';
import StarsContext from '../context/StarsContext';

export default function FilteredCategories() {
  const { filteredPlanets, filters } = useContext(StarsContext);

  function filtered() {
    const inputChosed = filteredPlanets.filter((planet) => {
      let comparingPlanets = true;
      filters.filterByNumericValues.forEach(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          comparingPlanets = comparingPlanets && Number(planet[column]) > Number(value);
          break;
        case 'menor que':
          comparingPlanets = comparingPlanets && Number(planet[column]) < Number(value);
          break;
        case 'igual a':
          comparingPlanets = comparingPlanets && Number(planet[column]) === Number(value);
          break;
        default:
          comparingPlanets = false;
        }
      });

      return comparingPlanets;
    });
    return inputChosed.map(((planet, index) => (
      <tr key={ index }>
        {Object.values(planet).map((info) => (
          <td key={ info.name }>
            {info}
          </td>
        ))}
      </tr>)));
  }

  return filtered();
}
