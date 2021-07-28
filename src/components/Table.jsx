import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

function Table() {
  const { data, filters } = useContext(PlanetsContext);
  const { filterByName, filterByNumericValues } = filters;
  const { name } = filterByName;

  function filterName() {
    if (name.length > 0 || filterByNumericValues.length > 0) {
      const filteredByName = data.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())));
      if (filterByNumericValues.length > 0) {
        let array = [...filteredByName];
        filterByNumericValues.forEach(({ column, comparison, value }) => {
          array = array.filter((planet) => {
            switch (comparison) {
            case 'maior que':
              return Number(planet[column]) > Number(value);
            case 'menor que':
              return Number(planet[column]) < Number(value);
            case 'igual a':
              return Number(planet[column]) === Number(value);
            default:
              return true;
            }
          });
          return array;
        });
      }
      return filteredByName;
    }
    return data;
  }

  return (
    <table>
      <TableHeader />
      <tbody>
        {filterName()
          .map((planet, index) => <TableBody key={ index } planet={ planet } />)}
      </tbody>
    </table>
  );
}

export default Table;
