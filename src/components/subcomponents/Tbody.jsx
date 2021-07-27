import React from 'react';
import PropTypes from 'react-dom';

function Tbody({ tableBody }) {
  return (
    <tbody>
      {tableBody.map((planet) => (
        <tr key={ planet.name }>
          {planet.map((info) => (<td key={ info + info.length }>{info}</td>))}
        </tr>))}
    </tbody>
  );
}

Tbody.propTypes = {
  tableBody: PropTypes.array,
}.isRequired;

export default Tbody;
