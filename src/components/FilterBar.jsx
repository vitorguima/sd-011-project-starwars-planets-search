import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/filterBar.css';

function FilterBar() {
  const {
    planets,
    filters,
    setFilters,
    handleFilterByName,
    handleFilterByColumn,
    setFilteredColumn,
  } = useContext(PlanetsContext);

  const arrayOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [fieldColumn, setFieldColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState(arrayOptions);

  const handleChange = ({ target: { value } }) => {
    handleFilterByName(value);
  };

  const compareFilters = () => {
    const obj = {
      fieldColumn,
      comparison,
      inputValue,
    };
    const filterSelect = filteredOptions.filter((filter) => filter !== fieldColumn);
    setFilteredOptions([...filterSelect]);
    handleFilterByColumn(obj);
    setFilters([...filters, obj]);
  };

  const delectedFilter = ({ target: { name } }) => {
    const eraseFilter = filters.filter((item) => item.fieldColumn !== name);
    setFilters(eraseFilter);
    if (eraseFilter.length >= 1) {
      const restorePlanets = eraseFilter.filter((newFilter) => {
        switch (newFilter.comparison) {
        case 'maior que':
          return (planets
            .filter((planet) => planet[newFilter.fieldColumn]
            > parseInt(newFilter.inputValue, 10)));

        case 'menor que':
          return (planets
            .filter((planet) => planet[newFilter.fieldColumn]
            < parseInt(newFilter.inputValue, 10)));

        case 'igual a':
          return (planets
            .filter((planet) => newFilter.inputValue === planet[newFilter.fieldColumn]));

        default:
          return planets;
        }
      });
      setFilteredColumn(restorePlanets);
    } else {
      setFilteredColumn(planets);
    }
  };

  return (
    <div>
      <div className="bar-container">
        <div className="field-search">
          <label htmlFor="search-name">
            <input
              type="text"
              name="search-name"
              data-testid="name-filter"
              placeholder="Pesquise o planeta pelo nome"
              onChange={ handleChange }
              className="search-input"
            />
          </label>
        </div>
        <label htmlFor="filter-by-column">
          <select
            data-testid="column-filter"
            name="filter-by-column"
            onChange={ ({ target: { value } }) => setFieldColumn(value) }
          >
            { filteredOptions
              .map((option) => (
                <option
                  id={ option }
                  key={ option }
                  value={ option }
                >
                  {option}
                </option>))}

          </select>
        </label>
        <label htmlFor="filter-by-camparation">
          <select
            data-testid="comparison-filter"
            name="filter-by-comparation"
            onChange={ ({ target: { value } }) => setComparison(value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="filter-input">
          <input
            type="number"
            data-testid="value-filter"
            name="filter-input"
            onChange={ ({ target: { value } }) => setInputValue(value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ compareFilters }
        >
          Filtrar
        </button>
      </div>
      <div className="container-filters-selected">
        { filters.map((filter, index) => (
          <div key={ index } className="filtered-item" data-testid="filter">
            <p>{filter.fieldColumn}</p>
            <button
              type="button"
              className="filter-button"
              name={ filter.fieldColumn }
              onClick={ delectedFilter }
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
