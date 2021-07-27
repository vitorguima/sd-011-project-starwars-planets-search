import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useFilter from '../useFilter';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

function Table() {
  const { data, name } = useContext(PlanetsContext);
  const { planetFilter } = useFilter(data, name);
  return (
    <table>
      <TableHeader />
      <tbody>
        {planetFilter
          .map((planet, index) => <TableBody key={ index } planet={ planet } />)}
      </tbody>
    </table>
  );
}

export default Table;
