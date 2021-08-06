import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function Table() {
  const value = useContext(MainContext);
  console.log(value);
  return (
    <p>Table Component</p>
  );
}

export default Table;
