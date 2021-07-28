import React from 'react';

import TableHeader from './table/TableHeader';
import TableInput from './table/TableInput';
import InputColumn from './InputColumn';
import TableMain from './table/TableMain';

function Table() {
  return (
    <>
      <TableHeader />
      <TableInput />
      <InputColumn />
      <TableMain />
    </>
  );
}

export default Table;
