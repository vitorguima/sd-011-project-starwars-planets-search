import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import useFilteredData from '../hooks/useFilteredData';

export default function Table() {
  const [filteredData] = useFilteredData();
  const getTable = () => filteredData && filteredData.map((planet, index) => (<TableRow
    key={ index }
    planet={ planet }
  />));

  return (
    <table className="table table-striped table-hover">
      <TableHeader />
      <tbody>{getTable()}</tbody>
    </table>
  );
}
