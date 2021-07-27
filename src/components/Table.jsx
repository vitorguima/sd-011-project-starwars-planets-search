import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

function Table() {
  const { data } = useContext(PlanetsContext);
  return (
    <table>
      <TableHeader />
      <tbody>
        {data.map((planet, index) => <TableBody key={ index } planet={ planet } />)}
      </tbody>
    </table>
  );
}

export default Table;
