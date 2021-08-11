import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function NumericFilter({ onSubmit }) {
  const { filters } = useContext(AppContext);
  const { filterByNumericValues } = filters;

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

  const usedColumns = filterByNumericValues.map(
    (numericFilter) => numericFilter.column,
  );

  const filteredColumns = columns.filter(
    (column) => !usedColumns.includes(column),
  );

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ form.column }
        onChange={ (event) => {
          setForm({ ...form, column: event.currentTarget.value });
        } }
      >
        {filteredColumns.map((column) => (
          <option key={ column } value={ column }>
            {column}
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ form.comparison }
        onChange={ (event) => {
          setForm({ ...form, comparison: event.currentTarget.value });
        } }
      >
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
