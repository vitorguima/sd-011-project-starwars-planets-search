import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import Selects from './subcomponents/Selects';

function Header() {
  const { filterByName, filterByNumericValues } = useContext(Context);
  const initialSelects = { column: '', comparison: '', value: '' };
  const [selects, setSelects] = useState(initialSelects);

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
        <fieldset>
          <Selects selects={ selects } setSelects={ setSelects } />
          <button
            type="button"
            data-testid="button-filter"
            name="filterButton"
            onClick={ () => filterByNumericValues(selects) }
            /* disabled={ !(initialSelects.column && initialSelects.comparison && initialSelects.value) } */
          >
            Filtrar
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Header;
