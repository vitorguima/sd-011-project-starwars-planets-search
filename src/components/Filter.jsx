import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filter() {
  const { setNameFilter } = useContext(MyContext);
  // console.log(setNameFilter);

  return (
    <form>
      <label htmlFor="name-filter">
        Filtar planetas pelo nome:
        <input
          type="text"
          name="name-filter"
          data-testid="name-filter"
          onChange={ ({ target }) => setNameFilter(target.value) }
        />
      </label>
    </form>
  );
}

export default Filter;
