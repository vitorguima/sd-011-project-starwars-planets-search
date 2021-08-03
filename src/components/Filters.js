import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

function Filters() {
  const { filter, setFilter } = useContext(MyContext);

  function handleInput(e) {
    const inputValue = e.target.value;
    setData(searchTable(inputValue));
  }

  function searchTable(value) {
    const filteredData = [];

    if (value.length === 0) {
      return filter;
    }

    for (let i = 0; i < data.length; i+=) {
      const newValue = value.toLowerCase();

      const user = data[i].user.toLowerCase();

      if (user.includes(newValue)) {
        filteredData.push(data[i]);
      }
    }
    return filteredData;
  }

  return (
    <form>
      <label htmlFor="filterInput">
        <input
          data-testid="name-filter"
          id="filterInput"
          type="text"
          onChange={ handleInput }
          value={ filter }
          placeholder="Econtre um planeta"
        />
      </label>
    </form>
  );
}

export default Filters;
