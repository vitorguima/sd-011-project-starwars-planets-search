import React from 'react';
import PropTypes from 'prop-types';

export default function InputFilterByName(props) {
  const { handleChange } = props;
  return (
    <div>
      <input
        type="text"
        name="name"
        data-testid="name-filter"
        onChange={ (event) => handleChange(event) }
      />
    </div>
  );
}

InputFilterByName.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
