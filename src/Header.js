import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
import PlanetContext from './context/PlanetContex';
import Search from './Search';

function Header() {
  const { filters, handleChange } = useContext(PlanetContext);
  const { filterByName } = filters;
  const { name } = filterByName;

  return (
    <div>
      <header className="header">
        <label htmlFor="Name">
          <h1>Star Wars Planets</h1>
          <input
            data-testid="name-filter"
            type="text"
            placeholder="Enter the planet name"
            value={ name }
            onChange={ handleChange }
          />
        </label>
        <Search />
      </header>
    </div>
  );
}

Header.propTypes = ({
  name: PropTypes.string,
}).isRequired;

export default Header;
