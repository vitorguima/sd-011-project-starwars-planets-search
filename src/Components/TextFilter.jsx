import React from 'react';
import PropTypes from 'prop-types';

function TextFilter(props) {
  const { handleChange } = props;
  return (
    <label htmlFor="name">
      Digite o planeta
      <input
        type="text"
        id="name"
        name="name"
        onChange={ (e) => { handleChange(e); } }
        data-testid="name-filter"
      />
    </label>
  );
}

TextFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default TextFilter;
