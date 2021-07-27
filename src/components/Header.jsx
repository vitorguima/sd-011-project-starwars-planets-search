import React, { useContext } from 'react';
import Context from '../context/Context';

function Header() {
  const { filterByName } = useContext(Context);
  return (
    <div>
      <form>
        <fieldset>
          <input
            type="text"
            data-testid="name-filter"
            onChange={ ({ target }) => filterByName(target.value) }
          />
        </fieldset>
        <fieldset>
          <select>
            <option>
              a
            </option>
          </select>
          <select>
            <option>
              b
            </option>
          </select>
          <select>
            <option>
              c
            </option>
          </select>
        </fieldset>
      </form>
      FILTERS
    </div>
  );
}

export default Header;
