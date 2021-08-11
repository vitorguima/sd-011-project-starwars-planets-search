import React from 'react';
import PropTypes from 'prop-types';

function Datatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {data[0] && columns.map((heading, index) => {
            if (heading === 'residents') return null;
            return <th key={ index }>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={ index }>
            {
              columns.map((column) => {
                if (column === 'residents') return null;
                if (column === 'name') {
                  return (
                    <td data-testid="planet-name" key={ `${index} ${row[column]}` }>
                      {row[column]}
                    </td>
                  );
                }
                return <td key={ `${index} ${row[column]}` }>{row[column]}</td>;
              })
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Datatable;

Datatable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
