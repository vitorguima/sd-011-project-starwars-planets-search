import React, { useContext } from 'react';
import context from '../Context';

function Input() {
  // o usecontext acessa que esta no value do provider

  const { data } = useContext(context);
  const { filters, SetFiltersName } = useContext(context);
  const { setFilterData } = useContext(context);
  const { name } = useContext(context);
  console.log(filters);
  console.log(data);

  function searchName({ target }) {
    SetFiltersName(target.value.toLowerCase());
    const secondData = data.filter(
      (planet) => planet.name.toLowerCase().includes(target.value),
    );
    setFilterData(
      secondData,
    );
    console.log(secondData);
  }

  return (
    <div>
      <label htmlFor="name">
        <input
          id="name"
          type="text"
          placeholder="search name"
          data-testid="name-filter"
          onChange={ searchName }
          value={ name }
        />
      </label>

    </div>
  );
}

export default Input;
