import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../context/MainContext';

function Table() {
  const { data, filters: { filterByName: { name } } } = useContext(MainContext);
  const [filteredData, setFilteredData] = useState([]);
  let column = [];

  useEffect(() => {
    if (name) {
      setFilteredData(data.filter((planet) => planet.name.includes(name)));
    } else setFilteredData(data);
  }, [data, name]);

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
