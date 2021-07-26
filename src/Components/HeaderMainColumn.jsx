import React from 'react';
import propTypes from 'prop-types';

function HeaderMainColumn({ info }) {
  return (
    <th>
      { info }
    </th>
  );
}

export default HeaderMainColumn;

HeaderMainColumn.propTypes = {
  info: propTypes.string.isRequired,
};
