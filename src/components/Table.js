import React, { useContext } from 'react';
import StarWarsContext from './StarWarsContext';

function Table() {
  const { data } = useContext(StarWarsContext);
  function getKeys() {
    if (data[0]) {
      const keys = Object.keys(data[0]);
      return (
        keys.map((item, index) => <th key={ index }>{item}</th>)
      );
    }
  }
  // console.log(Object.keys(data[0])); <<< se eu uso ele nao funciona.
  return (
    <table>
      <thead>
        <tr>
          {getKeys()}
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index) => <tr key={ index }>{Object.values(item).map((tdName, index2) => <td key={ index2 }>{tdName}</td>)}</tr>)
        }
      </tbody>
    </table>
  );
}

export default Table;
