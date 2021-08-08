import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function Table() {
  const { filteredData } = useContext(MainContext);
  let column = [];

  if (filteredData.length) {
    column = Object.keys(filteredData[0]);

    return (
      <table border="1">
        <thead>
          <tr>
            {
              column.map((key) => (
                <th key={ key }>{ key }</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {filteredData.map((planets, index) => (
            <tr key={ index }>
              {Object.values(planets).map((value) => (
                <td key={ value }>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return <p>Loading...</p>;
}

export default Table;
