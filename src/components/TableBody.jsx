import React from 'react';
import PropTypes from 'prop-types';

function TableBody(props) {
  const { planet } = props;
  return (
    <tr>
      {Object.values(planet).map((info) => <td key={ info }>{info}</td>)}
    </tr>
  );
}

export default TableBody;

TableBody.propTypes = {
  planet: PropTypes.objectOf(PropTypes.string).isRequired,
};
