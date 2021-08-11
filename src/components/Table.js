import React, { useContext, useEffect } from 'react';
import MainContext from '../context/MainContext';
import sortNumbers from '../helpers/functionsFitlers';

function qualquerCoisa(filterByNumericValues, data, name, setFilteredData) {
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
        setFilteredData((oldFilteredData) => oldFilteredData.filter((planet) => (
          (parseInt(planet[filter.column], 10) === parseInt(filter.value, 10))
        )));
        break;

      default:
        break;
      }
    });
  } else setFilteredData(data);
}

function qualquerCoisa2(filteredData, name) {
  return filteredData.map((planets, index) => {
    if (name.length) {
      return (
        planets.name.includes(name)
          ? (
            <tr key={ index }>
              {Object.values(planets).map((value, position) => (
                <td
                  key={ value }
                  data-testid={ position === 0 ? 'planet-name' : '' }
                >
                  {value}
                </td>
              ))}
            </tr>) : null);
    }
    return (
      <tr key={ index }>
        {Object.values(planets).map((value, position) => (
          <td
            key={ value }
            data-testid={ position === 0 ? 'planet-name' : '' }
          >
            {value}
          </td>
        ))}
      </tr>);
  });
}
function Table() {
  const {
    data,
    filters: {
      filterByName: { name },
      filterByNumericValues,
    },
    filteredData,
    sets: { setFilteredData },
    order,
  } = useContext(MainContext);
  let column = [];

  useEffect(() => {
    qualquerCoisa(filterByNumericValues, data, name, setFilteredData);
  }, [filterByNumericValues, data, name, setFilteredData]);

  if (data.length) {
    sortNumbers(order, filteredData, setFilteredData);
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
          { qualquerCoisa2(filteredData, name) }
        </tbody>
      </table>
    );
  }

  return <p>Loading...</p>;
}

export default Table;
