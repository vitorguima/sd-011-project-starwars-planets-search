import React, { useContext, useEffect } from 'react';
import MainContext from '../context/MainContext';
import { numericFilter } from '../helpers/fitlersFunctions';

function Table() {
  const {
    data,
    filters: {
      filterByName: { name },
      filterByNumericValues,
    },
    filteredData,
    sets: { setFilteredData },
  } = useContext(MainContext);
  let column = [];

  useEffect(() => {
    numericFilter(data, filterByNumericValues, setFilteredData);
  }, [filterByNumericValues, data, name, setFilteredData]);

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
          {filteredData.map((planets, index) => {
            if (name.length) {
              return (
                planets.name.includes(name)
                  ? (
                    <tr key={ index }>
                      {Object.values(planets).map((value) => (
                        <td key={ value }>{value}</td>
                      ))}
                    </tr>) : null);
            }
            return (
              <tr key={ index }>
                {Object.values(planets).map((value) => (
                  <td key={ value }>{value}</td>
                ))}
              </tr>);
          })}
        </tbody>
      </table>
    );
  }

  return <p>Loading...</p>;
}

export default Table;
