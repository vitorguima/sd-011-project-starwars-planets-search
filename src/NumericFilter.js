import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NumericFilter({ onSubmit }) {
  const [form, setForm] = useState({
    column: '',
    comparison: '',
    value: 0,
  });

  function submit() {
    onSubmit(form);
    setForm({
      column: '',
      comparison: '',
      value: 0,
    });
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ form.column }
        onChange={ (event) => {
          setForm({ ...form, column: event.currentTarget.value });
        } }
      >
        <option disabled value="">
          Select one
        </option>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ form.comparison }
        onChange={ (event) => {
          setForm({ ...form, comparison: event.currentTarget.value });
        } }
      >
        <option disabled value="">
          Select one
        </option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        placeholder="value"
        value={ form.value }
        onChange={ (event) => {
          setForm({ ...form, value: Number(event.currentTarget.value) });
        } }
      />
      <button type="button" data-testid="button-filter" onClick={ submit }>
        add filter
      </button>
    </div>
  );
}

NumericFilter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NumericFilter;
