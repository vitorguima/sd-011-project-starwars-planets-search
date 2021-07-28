import React, { useContext } from 'react';
import Context from '../context/Context';
import Selects from './subcomponents/Selects';

function Header() {
  const { filterByName } = useContext(Context);
  return (
    <div>
      <form>
        FILTERS
        <fieldset>
          <input
            type="text"
            data-testid="name-filter"
            onChange={ ({ target }) => filterByName(target.value) }
          />
        </fieldset>
        <Selects />
        <fieldset>
          <button type="button" data-testid="button-filter" name="filterButton">
            Filtrar
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Header;
