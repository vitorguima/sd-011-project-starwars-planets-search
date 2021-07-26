import React, { useContext } from 'react';
import TableHeader from './TableHeader';
import Context from '../Context/Context';
import Columns from './Columns';
import NameFilter from './NameFIlter';

const Table = () => {
  const { data } = useContext(Context);
  if (data.length === 0) return <p>loading...</p>;
  return (
    <div>
      <NameFilter />
      <TableHeader />
      <Columns />
    </div>
  );
};

export default Table;
