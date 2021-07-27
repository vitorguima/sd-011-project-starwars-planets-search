import React, { useContext } from 'react';
import GlobalContext from './Context';

const Table = () => {
  const planetData = useContext(GlobalContext);
  console.log(planetData);

  return (
    <p>Olá</p>
    // <td>
    //   <tr>
    //     {Object
    //       .keys(planetData)
    //       .filter((content) => content !== 'residents')
    //       .map((header, index) => <th key={ index }>{header}</th>)}
    //   </tr>
    // </td>
  );
};

export default Table;
