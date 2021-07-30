import React, { useContext } from 'react';
import Context from '../context/Context';
import Thead from './subcomponents/Thead';
import Tbody from './subcomponents/Tbody';

function Table() {
  const { data, error, filters } = useContext(Context);

  if (!data) return <span>Loading</span>;
  if (error) return <span>{JSON.stringify(error)}</span>;

  const {
    filterByName: { name },
    filterByNumericValues: [{ column, comparison, value }],
  } = filters;

  const keysFilter = ['residents'];
  const tableHead = Object.keys(data[0]).filter((key) => !keysFilter.includes(key));
  const tableBody = data.filter((planet) => {
    if (comparison === 'maior que') {
      return (Number((planet[column]) > Number(value)) && planet.name.includes(name));
    } if (comparison === 'menor que') {
      return (Number((planet[column]) < Number(value)) && planet.name.includes(name));
    } if (comparison === 'igual a') {
      return ((Number(planet[column]) === Number(value)) && planet.name.includes(name));
    }
    return (planet.name.includes(name));
  }).map((planet) => {
    keysFilter.forEach((filter) => delete planet[filter]);
    return Object.values(planet);
  });

  return (
    <table>
      <Thead tableHead={ tableHead } />
      <Tbody tableBody={ tableBody } />
    </table>
  );
}

export default Table;
