import React from 'react';
// import PropTypes from 'prop-types';

function ValueFilter() {
  return (
    <label htmlFor="comparison-filter">
      <input type="number" min="1" data-testid="value-filter" placeholder="Population" />
    </label>
  );
}

export default ValueFilter;
