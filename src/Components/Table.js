import React from 'react';
import PropTypes from 'prop-types';

function Table({ dataForTable }) {
  const columns = dataForTable[0] && Object.keys(dataForTable[0]);
  return (
    <table>
      <thead>
        <tr>
          { dataForTable[0]
          && columns.map((head, index) => {
            if (head === 'residents') return null;
            return <th key={ index }>{ head }</th>;
          })}
        </tr>
      </thead>
      <tbody>
        { dataForTable.map((rolls, index) => (
          <tr key={ index }>
            { columns.map((column) => {
              if (column === 'residents') return null;
              return <td key={ `${index} ${rolls[columns]}` }>{ rolls[column] }</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  dataForTable: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default Table;
