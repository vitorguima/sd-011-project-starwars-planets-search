import React, { useContext } from 'react';
import ContextApp from '../context/ContextApp';

function Forms() {
  const { setFilter } = useContext(ContextApp);

  const handleChange = ({ target: { value } }) => {
    setFilter(value.toLowerCase());
  };

  return (
    <header>
      <form>
        <label htmlFor="filterByName">
          Filter by name:
          <input
            data-testId="name-filter"
            type="text"
            id="filterByName"
            onChange={ handleChange }
          />
        </label>
      </form>
    </header>
  );
}

export default Forms;
