import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

function Table() {
  const { data, filters } = useContext(PlanetsContext);
  const {
    filterByName: {
      name,
    },
    filterByNumericValues: [{
      column,
      comparison,
      value }] } = filters;

  function filterName() {
    if (name.length > 0 || column.length > 0) {
      const filteredByName = data.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())));
      if (column.length > 0) {
        const filteredByNumeric = filteredByName.filter((planet) => {
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
        return filteredByNumeric;
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
