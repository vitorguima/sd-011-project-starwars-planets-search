import React, { useContext, useState } from 'react';
import RequisitionContext from '../Context/RequisitionContext';

export default function NumericFilter() {
  const [formState, setFormState] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  const { setFilterOn, filters:
    { setFilterByNumericValues } } = useContext(RequisitionContext);

  const formHandleChange = (event) => {
    const { target: { id, value: selectValue } } = event;
    setFormState({
      ...formState,
      [id]: selectValue,
    });
  };

  const dispatchFilter = (event) => {
    event.preventDefault();
    setFilterByNumericValues([formState]);
    setFilterOn(true);
  };

  return (
    <form onSubmit={ (e) => dispatchFilter(e) }>
      <select
        data-testid="column-filter"
        id="column"
        onChange={ (e) => formHandleChange(e) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        id="comparison"
        onChange={ (e) => formHandleChange(e) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        placeholder="insira o valor"
        data-testid="value-filter"
        id="value"
        onChange={ (e) => formHandleChange(e) }
      />
      <button type="submit" data-testid="button-filter">Filtrar</button>
    </form>
  );
}
