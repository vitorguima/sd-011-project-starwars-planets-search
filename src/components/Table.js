import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

export default function Table() {
  const { planets, filters } = useContext(AppContext);

  // Font: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
  const removeResidents = (planetsArr) => planetsArr.map((planet) => {
    delete planet.residents;
    return planet;
  });

  const handleCompare = (toCompare, filter) => {
    const a = parseFloat(toCompare);
    const b = parseFloat(filter.value);
    switch (filter.comparison) {
    case 'maior que':
      return a > b;
    case 'menor que':
      return a < b;
    case 'igual a':
      return a === b;
    default:
      return console.log(`${a} ${b}`);
    }
  };

  const filterPlanets = () => {
    let list = removeResidents([...planets]);
    if (filters.filterByName.name) {
      const regex = new RegExp(`${filters.filterByName.name}`, 'gi');
      list = list.filter((planet) => planet.name.match(regex));
    }
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((filter) => {
        list = list.filter((planet) => handleCompare(planet[filter.column], filter));
      });
    }
    return list;
  };

  const listOfPlanets = filterPlanets();

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          { Object.keys(removeResidents(planets)[0]).map(
            (cell, index) => (<th key={ `${cell}${index}` }>{cell}</th>),
          ) }
        </tr>
      </thead>
      <tbody>
        {
          listOfPlanets.map((planet, index) => (
            <tr key={ `${planet}--${index}` }>
              { Object.values(planet).map((value, innerIndex) => (
                <td key={ `${index}--${innerIndex}` }>{value}</td>
              )) }
            </tr>
          ))
        }
      </tbody>
    </table>
  );

  if (planets.length > 0) return renderTable();

  return (
    <h3>Loading...</h3>
  );
}
