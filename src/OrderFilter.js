import React, { useState } from 'react';
import PropTypes from 'prop-types';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function OrderFilter({ onSubmit }) {
  const [form, setForm] = useState({ column: '', sort: '' });

  function submit() {
    onSubmit(form);
  }

  return (
    <div>
      <select
        data-testid="column-sort"
        value={ form.column }
        onChange={ (event) => {
          setForm({ ...form, column: event.currentTarget.value });
        } }
      >
        {columns.map((column) => (
          <option key={ column } value={ column }>
            {column}
          </option>
        ))}
      </select>
      <label htmlFor="column-sort-input-asc">
        asc
        <input
          type="radio"
          name="column-sort-order"
          id="column-sort-input-asc"
          data-testid="column-sort-input-asc"
          value="asc"
          checked={ form.sort === 'asc' }
          onChange={ () => setForm({ ...form, sort: 'asc' }) }
        />
      </label>
      <label htmlFor="column-sort-input-desc">
        desc
        <input
          type="radio"
          name="column-sort-order"
          id="column-sort-input-desc"
          data-testid="column-sort-input-desc"
          value="desc"
          checked={ form.sort === 'desc' }
          onChange={ () => setForm({ ...form, sort: 'desc' }) }
        />
      </label>
      <button type="button" data-testid="column-sort-button" onClick={ submit }>
        sort
      </button>
    </div>
  );
}

OrderFilter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default OrderFilter;
