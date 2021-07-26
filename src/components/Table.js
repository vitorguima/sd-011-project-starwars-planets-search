import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default function Table() {
  const { isLoading } = useContext(TableContext);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <table>
      <TableHeader />
      <TableBody />
    </table>
  );
}
