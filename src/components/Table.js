import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../context/MainContext';

function Table() {
  const { data, filters:
    { filterByName: { name }, filterByNumericValues } } = useContext(MainContext);
  const [filteredData, setFilteredData] = useState([]);
  let column = [];

  useEffect(() => {
    if (filterByNumericValues.length) {
      filterByNumericValues.forEach((filter) => {
        switch (filter.comparison) {
        case 'maior que':
          setFilteredData((oldFilteredData) => oldFilteredData.filter((planet) => (
            (parseInt(planet[filter.column], 10) > filter.value)
          )));
          break;

        case 'menor que':
          setFilteredData((oldFilteredData) => oldFilteredData.filter((planet) => (
            (parseInt(planet[filter.column], 10) < filter.value)
          )));
          break;

        case 'igual a':
          setFilteredData((oldFilteredData) => oldFilteredData.filter((planet) => {
            console.log(planet[filter.column]);
            console.log(filter.value);
            return parseInt(planet[filter.column], 10) === parseInt(filter.value, 10);
          }));
          break;

        default:
          break;
        }
      });
    } else setFilteredData(data);
  }, [filterByNumericValues, data, name]);

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
