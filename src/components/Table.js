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
    const dictionaryToCompare = {
      'maior que': (a, b) => a > b,
      'menor que': (a, b) => a < b,
      'igual a': (a, b) => a === b,
    };
    return dictionaryToCompare[filter.comparison](
      parseFloat(toCompare), parseFloat(filter.value),
    );
  };

  const filterPlanets = () => {
    let list = removeResidents([...planets]);
    if (filters.filterByName.name) {
      const regex = new RegExp(`${filters.filterByName.name}`, 'gi');
      list = list.filter((planet) => planet.name.match(regex));
    }
    if (filters.filterByNumericValues.length > 0) {
      const filter = filters.filterByNumericValues[
        filters.filterByNumericValues.length - 1];
      list = list.filter((planet) => handleCompare(planet[filter.column], filter));
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
            <tr key={ planet }>
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
