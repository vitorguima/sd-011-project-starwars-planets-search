import React, { useContext, useState } from 'react';
import GlobalContext from '../Context/GlobalContext';

export default function NumericFilter() {
  const { setFilterOn, filters:
    { setFilterByNumericValues } } = useContext(GlobalContext);
  const [formState, setFormState] = useState({
    column: '',
    comparison: '',
    value: '',
  });
  
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
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        id="comparison"
        onChange={ (e) => formHandleChange(e) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
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
