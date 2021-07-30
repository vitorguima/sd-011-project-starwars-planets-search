import React, { useContext } from 'react';
import Context from '../context/Context';
import Thead from './subcomponents/Thead';
import Tbody from './subcomponents/Tbody';
import tableBodyFilter from '../helpers/tableBodyFilter';

function Table() {
  const { data, error, filters } = useContext(Context);

  if (!data) return <span>Loading</span>;
  if (error) return <span>{JSON.stringify(error)}</span>;

  const keysFilter = ['residents'];
  const tableHead = Object.keys(data[0]).filter((key) => !keysFilter.includes(key));
  const tableBody = tableBodyFilter({ data, filters, keysFilter });

  return (
    <table>
      <Thead tableHead={ tableHead } />
      <Tbody tableBody={ tableBody } />
    </table>
  );
}

export default Table;
