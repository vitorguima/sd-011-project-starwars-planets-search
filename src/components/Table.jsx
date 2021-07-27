import React, { useContext } from 'react';
import PlanetsContext from '../context /PlanetsContext';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

function Table() {
  const { data } = useContext(PlanetsContext);
  console.log(data)
  return (
    <table>
      <tbody>
        <TableHeader />
        {data.map((planet) => <TableBody key={ planet } planet={ planet } />)}
      </tbody>
    </table>
  );
}

export default Table;
