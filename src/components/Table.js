import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function Table() {
  const { data } = useContext(MainContext);
  let column = [];

  if (data.length) {
    column = Object.keys(data[0]);

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
          {data.map((planets, index) => (
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
