import React, { useContext } from 'react';
import Context from '../Context/Context';

const TableHeader = () => {
  const { data } = useContext(Context);
  if (data.length === 0) return <p>loading...</p>;
  let headerTableArr = [];
  if (data.length > 0) headerTableArr = Object.keys(data[0]);

  return (
    <tr>{headerTableArr.map((header, index) => <th key={ index }>{ header }</th>) }</tr>
  );
};

export default TableHeader;
