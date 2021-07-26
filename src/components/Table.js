import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

export default function Table() {
  const { data } = useContext(TableContext);
  return (
    <div>
      { JSON.stringify(data) }
    </div>
  );
}
