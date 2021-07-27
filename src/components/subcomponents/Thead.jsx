import React from 'react';
import PropTypes from 'react-dom';

function THead({ tableHead }) {
  return (
    <thead>
      <tr>
        {tableHead.map((head) => (<th key={ head }>{head}</th>))}
      </tr>
    </thead>
  );
}

THead.propTypes = {
  tableHead: PropTypes.array,
}.isRequired;

export default THead;
